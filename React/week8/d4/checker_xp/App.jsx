// App.jsc

import './App.css'
import Home from './components/Home'
import Shop from './components/Shop'
import Profile from './components/Profile'
import {Routes, Route, Link} from "react-router"
import PostList from './components/PostList'
import Exemple1 from './components/Example1'
import Exemple2 from './components/Example2'
import Example3 from './components/Example3'
import ErrorBoundry from './components/ErrorBoundry'
import data from './components/data.json'
import data_2 from './components/data_2.json'
import { useEffect } from 'react'

function App() {
  const getSome = async () => {
    const url = 'https://webhook.site/#!/view/4c355bc5-70a7-4b20-8a6d-2df8662eb5bd';

    const data = {
      key1: 'myusername',
      email: 'mymail@gmail.com',
      name: 'Isaac',
      lastname: 'Doe',
      age: 27,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <header>
        <nav>
          <Link to={'/'}>Home</Link>
          <Link to={'/profile'}> Profile</Link>
          <Link to={'/shop'}> Shop</Link>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<ErrorBoundry fallback="An error has occured."><Home/></ErrorBoundry>}/>
        <Route path='/home' element={<ErrorBoundry fallback="An error has occured."><Home/></ErrorBoundry>}/>
        <Route path='/profile' element={<ErrorBoundry fallback="An error has occured."><Profile/></ErrorBoundry>}/>
        <Route path='/shop' element={<ErrorBoundry fallback="An error has occured."><Shop/></ErrorBoundry>}/>
      </Routes>
      {
        
      }
      <PostList posts={data} />
      <Exemple1 socmedia={data_2.SocialMedias}/>
      <Exemple2 skills={data_2.Skills}/>
      <Example3 developer={data_2.Experiences}/>

      <div>
        <h1>Webhook тест</h1>
        <button onClick={getSome}>Send</button>
    </div>
    </>
  )
}

export default App



// ErrorBoundy

import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.error(error, info);
  }

  render() {
    return this.state.hasError
      ? <h2>{this.props.fallback}</h2>
      : this.props.children;
  }
}

export default ErrorBoundary;


// Example 1
const Exemple1 = (props) => {
  const socmedia = props.socmedia
  return (
    <>
      <h3>Example 1</h3>
      {socmedia.map((url, index) => (
        <div key={index}>
          <p>{url}</p>
        </div>
      ))}
    </>
  )
}

export default Exemple1

// Example 2

const Exemple2 = (props) => {
  const skills = props.skills
  return (
    <>
      <h3>Example 2</h3>
      {skills.map((group) => (
        <div key={group.Area}>
          <h4>{group.Area}</h4>
          <ul>
            {group.SkillSet.map(skill => (
              <li key={skill.Name}>
                {skill.Name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}

export default Exemple2


// Example 3
const Example3 = (props) => {
  const developer = props.developer
  return (
    <>
    <h3>Example 3</h3>

      {developer.map((company, index) => (
        <div key={index}>
          <img src={company.logo} alt="company logo" /> <br />
          <a href={company.url}>{company.companyName}</a>
          {company.roles.map(position => (
            <div>
              <p><strong>{position.title}</strong></p>
              <p>{position.startDate}{position.location}</p>
              <p>{position.description}</p>
            </div>
          ))}


        </div>
      ))}
    </>
  )
}

export default Example3

// Home
const Home = () => {
  return (
    <>
    <h2> Home</h2>
    </>
  )
}

export default Home


// PostList
const PostList = (props) => {
  const posts = props.posts
  
  return (
    <div>
      <h2>Hi this is a Title</h2>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList


// Profile
const Profile = () => {
  return (
    <>
    <h2>Profile Screen</h2>
    </>
  )
}

export default Profile

// Shop 
const Shop = () => { 
  
  throw new Error('shop'); };

  export default Shop;