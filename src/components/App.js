
import React from 'react'
import '../styles.css'
import { Switch, Route, Link, useHistory } from 'react-router-dom'
import Logout from './Logout'
import Register from './Register'
import Login from './Login'
import Coffee from './Coffee'
import PrivateRoute from '../utils/PrivateRoute'
import EditCoffee from './EditCoffee'
import Nav from './Nav'
import cookie from 'js-cookie'

export const userID = cookie.get('userID')

export default function (props) {

  const history = useHistory()



  return (

    <div className='container'>
      <Nav />
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
        <PrivateRoute path='/coffee' component={Coffee} />
        <Route path='/'>
          <h1>helo wrld</h1>
          <p>This app is an example of using React to interact with data on
      restricted routes in Node (backend) that are using JWTs and cookies. Look through the <a href='https://github.com/tommyconner96/starter-bw-frontend'>Frontend repo</a>. <br />
            <br />
        Also feel free to look through the <a href='https://github.com/tommyconner96/starter-bw'>Backend repo</a>. <br />
          </p>
        </Route>
      </Switch>
    </div>
  )
}