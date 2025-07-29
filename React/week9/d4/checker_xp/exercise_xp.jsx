// App.jsx
import './App.css'
import BookList from './feature/BookList'

function App() {

  return (
    <>
      <h2>Exercise XP</h2>
      <BookList/>
    </>
  )
}

export default App

// main.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import store from './app/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)


// booksleci.js
import {createSlice} from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  books: [
    {
      id: uuidv4(),
      title: "The Shining",
      author: "Stephen King",
      genre: "Horror"
    },
    {
      id: uuidv4(),
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      genre: "Fantasy"
    },
    {
      id: uuidv4(),
      title: "Dune",
      author: "Frank Herbert",
      genre: "Science Fiction"
    },
    {
      id: uuidv4(),
      title: "Pet Sematary",
      author: "Stephen King",
      genre: "Horror"
    }
  ],
  selectedGenre: "All"
};


const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    getAllbook:(state, action)=>{
      state.selectedGenre = action.payload
    },
    getBookByGenre: (state, action) => {
      state.genre = action.payload
    }
  }
})


export default booksSlice.reducer
export const selectBookState = (state) => state.BooksReducer
export const {getAllbook, getBookByGenre} = booksSlice.actions


// BooList.jsx
import React, { useEffect, useState } from 'react';
import {
  useBookSelector,
  useBookHorrorSelector,
  useBookFantasySelector,
  useBookScienceSelector,
  useFetchBooks
} from './selectors/hook';

export default function BookList() {
  const [genre, setGenre] = useState('All');
  const fetchBooks = useFetchBooks();

  useEffect(() => { fetchBooks(); }, []);

  const allBooks = useBookSelector();
  const horrorBooks = useBookHorrorSelector();
  const fantasyBooks = useBookFantasySelector();
  const sciFiBooks = useBookScienceSelector();

  const books = {
    All: allBooks,
    Horror: horrorBooks,
    Fantasy: fantasyBooks,
    'Science Fiction': sciFiBooks
  }[genre];

  return (
    <>
      <h2>Books - {genre}</h2>
      <div style={{ marginBottom: '1rem' }}>
        {['All', 'Horror', 'Fantasy', 'Science Fiction'].map(genre => (
          <button
            key={genre}
            onClick={() => setGenre(genre)}
            style={{
              fontWeight: genre === genre ? 'bold' : 'normal',
              marginRight: '0.5rem'
            }}
          >
            {genre}
          </button>
        ))}
      </div>

      <div>
        {books.map(book => (
          <div key={book.id} style={{ marginBottom: '1rem' }}>
            <strong>{book.title}</strong> by {book.author} ({book.genre})
          </div>
        ))}
      </div>
    </>
  );
}
 
// sectorsBook.js
import {createSelector} from "@reduxjs/toolkit"
import { selectBookState } from "../booksSlice"


export const selectBooks = createSelector([selectBookState], (stateBook)=>{
  return stateBook.books
})

export const selectHorrorBooks = createSelector(
  [selectBooks],
  (books) => books.filter(book => book.genre === 'Horror')
);


export const selectFantasyBooks = createSelector(
  [selectBooks],
  (books) => books.filter(book => book.genre === 'Fantasy')
);


export const selectScienceFictionBooks = createSelector(
  [selectBooks],
  (books) => books.filter(book => book.genre === 'Science Fiction')
);

// hooks. js

import {useSelector, useDispatch} from 'react-redux'
import {
  selectBooks,
  selectHorrorBooks,
  selectFantasyBooks,
  selectScienceFictionBooks
} from './selectBook'

import { getAllbook, getBookByGenre } from '../booksSlice'
import { useCallback } from 'react'


export const useBookSelector = () => {
  return useSelector(selectBooks)
};

export const useBookHorrorSelector = () => {
  return useSelector(selectHorrorBooks)
};

export const useBookFantasySelector = () => {
  return useSelector(selectFantasyBooks)
};

export const useBookScienceSelector = () => {
  return useSelector(selectScienceFictionBooks)
};


export const useFetchBooks = () => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(getAllbook());
  }, [dispatch]);
};

// store
import {configureStore} from "@reduxjs/toolkit"
import BooksReducer from '../feature/booksSlice'

const store = configureStore({
  reducer:{
  BooksReducer: BooksReducer}

})

export default store