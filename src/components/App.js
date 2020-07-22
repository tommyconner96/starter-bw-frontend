import React from 'react'
import '../styles.css'
import { Switch, Route, Link } from 'react-router-dom'
import Logout from './Logout'
import Register from './Register'
import Login from './Login'
import Coffee from './Coffee'
import PrivateRoute from '../utils/PrivateRoute'


function App() {
  return (
    <div className='container'>
      <div className='nav'>
        <Link to='/'>Home</Link>
        <Link to='/coffee'>Coffee</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
        <Link to='/logout'>Logout</Link>
      </div>

      <Switch>
        <Route path='/logout'>
          <Logout />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route exact path='/coffee' component={Coffee} />
        <Route path='/'>
          <h1>helo wrld</h1>
          <p>This app is an example of using React and axios to interact with data on
          restricted routes in Node that are using JWTs and cookies. Look through the
            <br />
            <a href='https://github.com/tommyconner96/starter-bw-frontend'>Frontend repo</a>
            <br />
            <a href='https://github.com/tommyconner96/starter-bw'>Backend reop</a>
          </p>
        </Route>
      </Switch>
    </div>
  )
}

export default App
