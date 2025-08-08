const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/users_model');

const register = async (req, res) => {
  const { username, email, password } = req.body;

  
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  if (username.length < 3) {
    return res.status(400).json({ message: 'Username must be at least 3 characters long.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }
  const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!strongPasswordRegex.test(password)) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters long and include at least one letter and one number.',
    });
  }

  try {
    if (await userModel.getUserByEmail(email)) {
      return res.status(400).json({ message: 'Email already in use.' });
    }
    if (await userModel.getUserByUsername(username)) {
      return res.status(400).json({ message: 'Username already in use.' });
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await userModel.createUser(username, email, hashedPassword);

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser.id, username: newUser.username, email: newUser.email },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const user = await userModel.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const accessToken = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({
      message: 'Login successful',
      accessToken,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(403).json({ message: 'Refresh token missing' });

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired refresh token' });

    const newAccessToken = jwt.sign(
      { userId: user.userId, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ accessToken: newAccessToken });
  });
};

const logout = (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(200).json({ message: 'Logout successful' });
};

const me = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email
    });
  } catch (error) {
    console.error('Me error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  login,
  refreshAccessToken,
  logout,
  me
};


const commentModel = require('../models/comments_model');

const createComment = async (req, res) => {
  const { story_id, content } = req.body;

  if (!story_id || !content) {
    return res.status(400).json({ message: 'story_id and content are required' });
  }

  try {
    const comment = await commentModel.createComment(story_id, req.user.userId, content);
    res.status(201).json(comment);
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getCommentsByStory = async (req, res) => {
  const { story_id } = req.params;

  try {
    const comments = await commentModel.getCommentsByStoryId(story_id);
    res.status(200).json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await commentModel.deleteComment(id, req.user.userId);
    if (deleted) {
      res.json({ message: 'Comment deleted' });
    } else {
      res.status(403).json({ message: 'Not allowed to delete this comment' });
    }
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createComment,
  getCommentsByStory,
  deleteComment,
};


const contributorModel = require('../models/contributors_model');
const userModel = require('../models/users_model');

const addContributor = async (req, res) => {
  const { story_id, user_id } = req.body;

  if (!story_id || !user_id) {
    return res.status(400).json({ message: 'story_id and user_id are required' });
  }

  try {
    const contributor = await contributorModel.addContributor(story_id, user_id);
    res.status(201).json(contributor);
  } catch (err) {
    console.error('Add contributor error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const addContributorByUsername = async (req, res) => {
  const { story_id, username } = req.body;

  if (!story_id || !username) {
    return res.status(400).json({ message: 'story_id and username are required' });
  }

  try {
    const user = await userModel.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const [contributor] = await contributorModel.addContributor(story_id, user.id);
    res.status(201).json({ id: contributor.id, userId: user.id, username: user.username });
  } catch (err) {
    console.error('Add contributor by username error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getContributors = async (req, res) => {
  const { story_id } = req.params;

  try {
    const contributors = await contributorModel.getContributorsByStory(story_id);
    res.json(contributors);
  } catch (err) {
    console.error('Get contributors error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteContributor = async (req, res) => {
  const { id } = req.params;

  try {
    await contributorModel.deleteContributor(id);
    res.json({ message: 'Contributor removed successfully' });
  } catch (err) {
    console.error('Delete contributor error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addContributor,
  addContributorByUsername, 
  getContributors,
  deleteContributor
};


const storyModel = require('../models/stories_model');

const getStories = async (req, res) => {
  try {
    const stories = await storyModel.getAllStories();
    res.json(stories);
  } catch (err) {
    console.error('Get stories error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getStoryById = async (req, res) => {
  try {
    const {id} = req.params
    const story = await storyModel.getStoryById(id);
    if(!story) { res.status(404).json({ message: 'Story not found' })
      return 
    }
    res.status(200).json(story)
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Server error"})
    
    
  }
}

const createStory = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const story = await storyModel.createStory(title, content, req.user.userId);
    res.status(201).json({message: "Story createsd", story});
    console.log('req.user from JWT:', req.user);

  } catch (err) {
    console.error('Create story error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateStory = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const story = await storyModel.updateStory(id, title, content);
    res.json(story);
  } catch (err) {
    console.error('Update story error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteStory = async (req, res) => {
  const { id } = req.params;
  try {
    await storyModel.deleteStory(id);
    res.json({ message: 'Story deleted successfully' });
  } catch (err) {
    console.error('Delete story error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getStories,
  getStoryById,
  createStory,
  updateStory,
  deleteStory
};


const knex = require('knex')
require('dotenv').config({ path: __dirname + '/../.env' });

const db = knex({
  client: "pg",
  connection: {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    ssl: {rejectUnauthorized: false}
  }
})

module.exports = db


const storyModel = require('../models/stories_model');

const authorizeStoryAuthor = async (req, res, next) => {
  const { story_id, } = req.params; 
  const storyId = story_id || req.body.story_id; // 

  const story = await storyModel.getStoryById(storyId);
  if (!story) {
    return res.status(404).json({ message: 'Story not found' });
  }

  if (story.author_id !== req.user.userId) {
    return res.status(403).json({ message: 'You are not authorized to modify contributors for this story' });
  }

  next();
};

module.exports = authorizeStoryAuthor;


const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  const token = authHeader.split(' ')[1]; // Bearer token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired access token' });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateJWT;


const storyModel = require('../models/stories_model');
const contributorModel = require('../models/contributors_model');

const authorizeStoryAccess = async (req, res, next) => {
  const { id } = req.params; 
  const userId = req.user.userId;

  try {
    const story = await storyModel.getStoryById(id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }


    if (story.author_id === userId) {
      return next();
    }


    const contributors = await contributorModel.getContributorsByStory(id);
    const isContributor = contributors.some(c => c.id === userId);

    if (!isContributor) {
      return res.status(403).json({ message: 'You are not authorized to modify this story' });
    }

    next();
  } catch (err) {
    console.error('Authorization error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = authorizeStoryAccess;

exports.up = function (knex) {
  return knex.schema
    // 1. Users
    .createTable('users', function (table) {
      table.increments('id').primary();
      table.string('username', 50).notNullable();
      table.string('email', 100).unique().notNullable();
      table.text('password_hash').notNullable();
    })
    // 2. Stories
    .createTable('stories', function (table) {
      table.increments('id').primary();
      table.string('title', 255).notNullable();
      table.text('content').notNullable();
      table
        .integer('author_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    // 3. Contributors
    .createTable('contributors', function (table) {
      table.increments('id').primary();
      table
        .integer('story_id')
        .unsigned()
        .references('id')
        .inTable('stories')
        .onDelete('CASCADE');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('contributors')
    .dropTableIfExists('stories')
    .dropTableIfExists('users');
};


exports.up = function (knex) {
  return knex.schema.createTable('comments', function (table) {
    table.increments('id').primary();
    table.text('content').notNullable();
    table
      .integer('story_id')
      .unsigned()
      .references('id')
      .inTable('stories')
      .onDelete('CASCADE');
    table
      .integer('author_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('comments');
};


exports.up = function (knex) {
  return knex.schema.alterTable('comments', function (table) {
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('comments', function (table) {
    table.dropColumn('user_id');
  });
};



const db = require('../db/knex');

const createComment = async (storyId, userId, content) => {
  const [comment] = await db('comments')
    .insert({ story_id: storyId, user_id: userId, content })
    .returning('*');
  return comment;
};

const getCommentsByStoryId = async (storyId) => {
  return db('comments')
    .where({ story_id: storyId })
    .join('users', 'comments.user_id', 'users.id')
    .select('comments.id', 'comments.content', 'comments.created_at', 'users.username as author');
};

const deleteComment = async (id, userId) => {
  return db('comments')
    .where({ id, user_id: userId }) // The author could delete comments
    .del();
};

module.exports = {
  createComment,
  getCommentsByStoryId,
  deleteComment,
};


const db = require('../db/knex');

const addContributor = async (storyId, userId) => {
  const [contributor] = await db('contributors')
    .insert({ story_id: storyId, user_id: userId })
    .returning('*');
  return contributor;
};

const getContributorsByStory = (storyId) => {
  return db('contributors')
    .where({ story_id: storyId })
    .join('users', 'contributors.user_id', 'users.id')
    .select('contributors.id', 'users.username', 'users.email');
};

const deleteContributor = (id) => {
  return db('contributors').where({ id }).del();
};

module.exports = {
  addContributor,
  getContributorsByStory,
  deleteContributor
};


const db = require('../db/knex')

const getAllStories = () =>{
  return db('stories').select('*').orderBy('created_at', 'desc')
};

const getStoryById = (id) => {
  return db('stories').where({id}).first()
};

const createStory = async (title, content, author_id) => {
  const [story] = await db('stories')
    .insert({ title, content, author_id: author_id })
    .returning('*');
  return story;
};

const updateStory = async (id, title, content) => {
  const [story] = await db('stories')
    .where({ id })
    .update({ title, content, updated_at: db.fn.now() })
    .returning('*');
  return story;
};

const deleteStory = (id) => {
  return db('stories').where({ id }).del();
};

module.exports = {
  getAllStories,
  getStoryById,
  createStory,
  updateStory,
  deleteStory
};



const db = require('../db/knex');

const getUserById = (id) => {
  return db('users').where({ id }).first();
};

const getUserByUsername = (username) => {
  return db('users').where({ username }).first();
};

const getUserByEmail = (email) => {
  return db('users').where({ email }).first();
};

const createUser = async (username, email, passwordHash) => {
  const [user] = await db('users')
    .insert({ username, email, password_hash: passwordHash })
    .returning('*');
  return user;
};

module.exports = {
  getUserById,
  getUserByEmail,
  getUserByUsername,
  createUser,
};



const express = require('express');
const { register, login, refreshAccessToken, logout, me } = require('../controllers/auth_controller');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshAccessToken);
router.get('/me', authenticateJWT, me);
router.post('/logout', logout);

module.exports = router;


const express = require('express');
const router = express.Router();
const {
  createComment,
  getCommentsByStory,
  deleteComment
} = require('../controllers/comment_controller');

const authenticateJWT = require('../middleware/authMiddleware');

router.post('/', authenticateJWT, createComment);
router.get('/:story_id', authenticateJWT, getCommentsByStory);
router.delete('/:id', authenticateJWT, deleteComment);

module.exports = router;


const express = require('express');
const {
  addContributor,
  addContributorByUsername, 
  getContributors,
  deleteContributor
} = require('../controllers/contributor_controller');

const authenticateJWT = require('../middleware/authMiddleware');
const authorizeStoryAuthor = require('../middleware/authConrtibutorMiddleware');

const router = express.Router();


router.post('/by-username', authenticateJWT, authorizeStoryAuthor, addContributorByUsername);
router.post('/', authenticateJWT, authorizeStoryAuthor, addContributor);
router.get('/:story_id', authenticateJWT, getContributors);
router.delete('/:id', authenticateJWT, authorizeStoryAuthor, deleteContributor);

module.exports = router;



const express = require('express');
const { getStories,
  getStoryById, 
  createStory, 
  updateStory,
  deleteStory } = require('../controllers/stories_controller');
const authenticateJWT = require('../middleware/authMiddleware');
const authorizeStoryAccess  = require('../middleware/authStoryMiddleware');

const router = express.Router();

router.get('/', authenticateJWT, getStories);
router.get('/:id', authenticateJWT, getStoryById);
router.post('/', authenticateJWT, createStory);
router.patch('/:id', authenticateJWT, authorizeStoryAccess , updateStory);
router.delete('/:id', authenticateJWT, authorizeStoryAccess , deleteStory);

module.exports = router;


import axios from 'axios'
import store from '../app/store'
import { logout } from '../features/auth/authSlice'

const api = axios.create({
  baseURL: '/api',
})

api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        const refreshRes = await axios.post('/api/auth/refresh', {}, { withCredentials: true })

        const { accessToken } = refreshRes.data


        store.dispatch({ type: 'auth/refreshToken', payload: accessToken })


        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`

        return api(originalRequest)
      } catch (refreshError) {
        store.dispatch(logout())
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api


import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import storiesReducer from '../features/stories/storieSlice'
import createStoryReducer from '../features/stories/createStorySlice'
import updateStoryReducer from '../features/stories/updateStorySlice'
import deleteStoryReducer from '../features/stories/deleteStoryslice'
import contributorReducer from '../features/contributors/contributorSlice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        stories: storiesReducer,
        createStory: createStoryReducer,
        updateStory: updateStoryReducer,
        deleteStory: deleteStoryReducer,
        contributors: contributorReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {type AppDispatch, type RootState } from '../app/store'
import { loginUser } from '../features/auth/authSlice'
import { Navigate } from 'react-router-dom'

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated, status } = useSelector((state: RootState) => state.auth)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) {
      setError('Fill all fields')
      return
    }
    setError('')

    const result = await dispatch(loginUser({ username, password }))
    if (loginUser.rejected.match(result)) {
      setError(result.payload as string || 'Enter error')
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Log in</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            className="btn btn-primary w-full"
            type="submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { type RootState } from '../app/store'
import type { JSX } from 'react'

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  return isAuthenticated ? children : <Navigate to="/login" />
}
import React, { useState } from 'react'
import { useAppDispatch } from '../app/hooks'
import { loginUser } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (!res.ok) {
      const data = await res.json()
      setError(data.message || 'Registration failed')
    } else {
      // Auto login
      await dispatch(loginUser({ username: form.username, password: form.password }))
      navigate('/dashboard')
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-base-200">
      <div className="card bg-base-100 shadow-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="username" placeholder="Username" onChange={handleChange} className="input input-bordered w-full" />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="input input-bordered w-full" />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input input-bordered w-full" />
          {error && <p className="text-red-500">{error}</p>}
          <button className="btn btn-primary w-full" type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}

export default SignupPage


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../app/axios'

type User = {
  id: number
  username: string
  email: string
}

interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  status: 'idle'
}

// 🔐 Login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    { username, password }: { username: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await api.post('/auth/login', { username, password })
      return res.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed')
    }
  }
)

// 🔁 Refresh token + get user
export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkAPI) => {
    try {
      const refreshRes = await api.post('/auth/refresh')
      const { accessToken } = refreshRes.data

      // Save new accessToken в store
      thunkAPI.dispatch(refreshToken(accessToken))

      // Get user
      const meRes = await api.get('/auth/me')
      return meRes.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue('Session expired')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.isAuthenticated = false
      state.status = 'idle'
    },
    refreshToken: (state, action) => {
      state.accessToken = action.payload
      state.isAuthenticated = true
    }
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed'
        state.isAuthenticated = false
      })

      // REFRESH
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(refreshUser.rejected, (state) => {
        state.user = null
        state.accessToken = null
        state.isAuthenticated = false
      })
  }
})

export const { logout, refreshToken } = authSlice.actions
export default authSlice.reducer


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../app/axios'

export const fetchContributors = createAsyncThunk(
  'contributors/fetchByStory',
  async (storyId: number, thunkAPI) => {
    try {
      const res = await api.get(`/contributors/${storyId}`)
      return res.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to load contributors')
    }
  }
)

export const addContributor = createAsyncThunk(
  'contributors/add',
  async ({ story_id, user_id }: { story_id: number; user_id: number }, thunkAPI) => {
    try {
      const res = await api.post('/contributors', { story_id, user_id })
      return res.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to add contributor')
    }
  }
)

export const addContributorByUsername = createAsyncThunk(
  'contributors/addByUsername',
  async ({ story_id, username }: { story_id: number; username: string }, thunkAPI) => {
    try {
      const res = await api.post('/contributors/by-username', { story_id, username })
      return res.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to add contributor by username')
    }
  }
)

export const deleteContributor = createAsyncThunk(
  'contributors/delete',
  async (id: number, thunkAPI) => {
    try {
      await api.delete(`/contributors/${id}`)
      return id
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete contributor')
    }
  }
)

const contributorSlice = createSlice({
  name: 'contributors',
  initialState: {
    list: [] as Array<{ id: number, userId: number, username: string }>,
    status: 'idle',
    error: null as string | null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContributors.fulfilled, (state, action) => {
        state.list = action.payload
        state.status = 'succeeded'
      })
      .addCase(addContributor.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(addContributorByUsername.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(deleteContributor.fulfilled, (state, action) => {
        state.list = state.list.filter(c => c.id !== action.payload)
        state.status = 'succeeded'
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => { state.status = 'loading'; state.error = null }
      )
     .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
            state.status = 'failed';
            state.error = (action as any).payload as string;
        }
)
  }
})

export default contributorSlice.reducer


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface CreateStoryPayload {
  title: string
  content: string
}

interface Story {
  id: number
  title: string
  content: string
  author_id: number
  created_at: string
  updated_at: string
}

interface CreateStoryState {
  story: Story | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: CreateStoryState = {
  story: null,
  status: 'idle',
  error: null
}

export const createStory = createAsyncThunk(
  'stories/createStory',
  async (payload: CreateStoryPayload, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState()
      const token = state.auth.accessToken

      const res = await axios.post('/api/stories', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return res.data.story // 👈 важно!
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create story')
    }
  }
)

const createStorySlice = createSlice({
  name: 'createStory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStory.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(createStory.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.story = action.payload
      })
      .addCase(createStory.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
  }
})

export default createStorySlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../app/axios';

export const deleteStory = createAsyncThunk(
  'stories/delete',
  async (id: number, thunkAPI) => {
    try {
      await api.delete(`/stories/${id}`);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete story');
    }
  }
);

const deleteSlice = createSlice({
  name: 'deleteStory',
  initialState: { status: 'idle', error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteStory.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(deleteStory.fulfilled, (state) => { state.status = 'succeeded'; })
      .addCase(deleteStory.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload as string; });
  },
});

export default deleteSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../app/axios'

export interface Story {
  id: number
  title: string
  content: string
  author_id: number
  created_at: string
  updated_at: string
}

interface StoriesState {
  stories: Story[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: StoriesState = {
  stories: [],
  status: 'idle',
  error: null,
}


export const fetchStories = createAsyncThunk('stories/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await api.get('/stories')
    return res.data
  } catch (err: any) {
    console.error('Error fetching stories:', err?.response || err)
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to load stories')
  }
})

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.stories = action.payload
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
  },
})

export default storiesSlice.reducer


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../app/axios'

interface UpdatePayload {
  id: number
  title: string
  content: string
}

interface UpdateState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: UpdateState = {
  status: 'idle',
  error: null
}

export const updateStory = createAsyncThunk(
  'stories/update',
  async ({ id, title, content }: UpdatePayload, thunkAPI) => {
    try {
      const res = await api.patch(`/stories/${id}`, { title, content })
      return res.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update story')
    }
  }
)

const updateStorySlice = createSlice({
  name: 'updateStory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateStory.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(updateStory.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(updateStory.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
  }
})

export default updateStorySlice.reducer


import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStory } from '../features/stories/createStorySlice'
import { type RootState, type AppDispatch } from '../app/store'
import { useNavigate } from 'react-router-dom'
import StoryContributors from './StoryContributors'

const CreateStoryPage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [createdStoryId, setCreatedStoryId] = useState<number | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { status, error } = useSelector((state: RootState) => state.createStory)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await dispatch(createStory({ title, content }))
    if (createStory.fulfilled.match(result)) {
      setCreatedStoryId(result.payload.id)
     
    }
  }

  const handleFinish = () => {
    navigate('/dashboard')
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Create a New Story</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={!!createdStoryId}
        />
        <textarea
          placeholder="Content"
          className="w-full border p-2 rounded h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={!!createdStoryId}
        />
        {!createdStoryId && (
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Creating...' : 'Create Story'}
          </button>
        )}
        {status === 'failed' && <p className="text-red-500">{error}</p>}
      </form>

      {createdStoryId && (
        <div className="mt-10">
          <StoryContributors storyId={createdStoryId} />
          <button
            onClick={handleFinish}
            className="btn btn-success mt-6"
          >
            Finish & Go to Dashboard
          </button>
        </div>
      )}
    </div>
  )
}

export default CreateStoryPage


import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../app/hooks'
import { fetchStories } from '../features/stories/storieSlice'
import { deleteStory } from '../features/stories/deleteStoryslice'
import { type RootState } from '../app/store'
import { Link } from 'react-router-dom'


const DashboardPage = () => {
  const dispatch = useAppDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const { stories, status, error } = useSelector((state: RootState) => state.stories)
  const deleteStatus = useSelector((state: RootState) => state.deleteStory.status)

  useEffect(() => {
    dispatch(fetchStories())
  }, [dispatch])

  useEffect(() => {
  if (deleteStatus === 'succeeded') {
    dispatch(fetchStories())
  }
}, [deleteStatus, dispatch])

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this story?')) {
      dispatch(deleteStory(id))
    }
  }

  return (
    <div className="min-h-screen bg-base-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Welcome, {user?.username} 🎉</h1>
          <Link to="/create" className="btn btn-primary">+ New Story</Link>
        </header>

        <section>
          <h2 className="text-xl font-semibold mb-4">All Stories</h2>

          {status === 'loading' && <p>Loading stories...</p>}
          {status === 'failed' && <p className="text-red-500">{error}</p>}
          {status === 'succeeded' && stories.length === 0 && (
            <p className="text-gray-500">No stories found.</p>
          )}

          {status === 'succeeded' && stories.map((story) => (
            <div key={story.id} className="p-4 mb-4 border rounded shadow bg-white">
              <h3 className="text-lg font-bold">{story.title}</h3>
              <p className="text-sm text-gray-700">{story.content}</p>
              <p className="text-xs text-gray-400 mt-1">
                Created: {new Date(story.created_at).toLocaleDateString()}
              </p>

              {user?.id === story.author_id && (
                <div className="mt-2 flex gap-2">
                  <Link
                    to={`/stories/${story.id}/edit`}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-outline btn-error"
                    onClick={() => handleDelete(story.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default DashboardPage


import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../app/axios'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { updateStory } from '../features/stories/updateStorySlice'
import StoryContributors from './StoryContributors'

const EditStoryPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.auth)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await api.get(`/stories/${id}`)
        const story = res.data

        if (user?.id !== story.author_id) {
          setError('You are not authorized to edit this story.')
          return
        }

        setTitle(story.title)
        setContent(story.content)
        setLoading(false)
      } catch (err: any) {
        setError('Failed to load story')
      }
    }

    fetchStory()
  }, [id, user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await dispatch(updateStory({ id: Number(id), title, content }))
    if (updateStory.fulfilled.match(result)) {
      navigate('/dashboard')
    } else {
      setError(result.payload as string)
    }
  }

  if (loading) return <p className="p-4">Loading...</p>
  if (error) return <p className="p-4 text-red-500">{error}</p>

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Story</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea textarea-bordered w-full h-40"
        />
        <button className="btn btn-primary w-full" type="submit">Update Story</button>
      </form>

      <div className="mt-10 border-t pt-6">
        <StoryContributors storyId={Number(id)} />
      </div>
    </div>
  )
}

export default EditStoryPage


const HomePage = () => {
  return <h1 className="text-3xl font-bold text-center mt-20"> Home Page</h1>
}

export default HomePage


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { type RootState } from '../app/store';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!isAuthenticated) return null; 

  return (
    <nav className="bg-base-200 p-4 flex justify-between">
      <Link to="/dashboard" className="btn btn-ghost normal-case text-xl">Dashboard</Link>
      <button onClick={handleLogout} className="btn btn-error">Logout</button>
    </nav>
  );
};

export default Navbar;


export default function ProtectedPage() {
  return (
    <div className="text-2xl font-bold text-center mt-10">
      🎉 Welcome
    </div>
  )
}


import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchStories } from '../features/stories/storieSlice'

const StoriesPage = () => {
  const dispatch = useAppDispatch()
  const { stories, status, error } = useAppSelector((state) => state.stories)

  useEffect(() => {
    dispatch(fetchStories())
  }, [dispatch])

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'failed') return <p>Error: {error}</p>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Stories</h1>
      {stories.map((story) => (
        <div key={story.id} className="mb-4 p-4 border rounded bg-white shadow">
          <h2 className="text-xl font-semibold">{story.title}</h2>
          <p>{story.content}</p>
        </div>
      ))}
    </div>
  )
}

export default StoriesPage

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  fetchContributors,
  addContributorByUsername,
  deleteContributor
} from '../features/contributors/contributorSlice'

interface Props {
  storyId: number
}

const StoryContributors = ({ storyId }: Props) => {
  const dispatch = useAppDispatch()
  const { list, status, error } = useAppSelector((state) => state.contributors)
  const [username, setUsername] = useState('')

  useEffect(() => {
    dispatch(fetchContributors(storyId))
  }, [dispatch, storyId])

  const handleAdd = () => {
    if (username.trim()) {
      dispatch(addContributorByUsername({ story_id: storyId, username }))
        .then(() => {
          dispatch(fetchContributors(storyId))
          setUsername('')
        })
    }
  }

  const handleDelete = (id: number) => {
    dispatch(deleteContributor(id))
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Contributors</h3>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p className="text-red-500">{error}</p>}

      <ul className="space-y-2">
        {list.map((contributor) => (
          <li key={contributor.id} className="flex justify-between items-center bg-base-200 p-2 rounded">
            <span>{contributor.username}</span>
            <button
              onClick={() => handleDelete(contributor.id)}
              className="btn btn-xs btn-error"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input input-bordered"
          placeholder="Username"
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          Add
        </button>
      </div>
    </div>
  )
}

export default StoryContributors


import { Routes, Route } from 'react-router-dom'
import LoginPage from '../src/components/LoginPage'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './pages/Navbar'
import CreateStoryPage from './pages/CreateStoryPage'
import DashboardPage from './pages/DashboardPage' 
import SignupPage from './components/SignupPage'
import EditStoryPage from './pages/EditStoryPage'
import { useEffect } from 'react'
import { useAppDispatch } from './app/hooks'
import { refreshUser } from './features/auth/authSlice'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(refreshUser())
  }, [dispatch])
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/create" element={<CreateStoryPage />} />
        <Route path="/stories/:id/edit" element={<EditStoryPage />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage /> 
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../src/app/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)


require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: './src/backend/migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL, // Render/Neon
    migrations: {
      directory: './src/backend/migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};


require('dotenv').config();
const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const db = require('./src/backend/db/knex')
const authRouter = require('./src/backend/routers/auth_router')
const storiesRouter = require('./src/backend/routers/stories_router')
const contributorRouter = require('./src/backend/routers/contributor_router')
const commentRouter = require('./src/backend/routers/comment_router')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.get('/', (req, res)=>{
  res.send("Hello test")
})

app.use('/api/auth', authRouter)
app.use('/api/stories', storiesRouter)
app.use('/api/contributors', contributorRouter)
app.use('/api/comments', commentRouter)

// Test connect for server
app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`);
  
})

// Test connect for database
app.get('/db-test', async (req, res) => {
  try {
    const result = await db.raw('SELECT NOW()');
    res.json({ dbTime: result.rows[0].now });
  } catch (err) {
    console.error('DB Error:', err.message);
    res.status(500).json({ error: 'Database connection failed' });
  }
});