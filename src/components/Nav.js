import React from 'react'
import { Link } from 'react-router-dom'
import cookie from 'js-cookie'

// context api or something will solve the problem of the logout bytton

export default function () {
    return (
        <div className='nav'>
            <Link to='/'>Home</Link>
            <Link to='/coffee'>Coffee</Link>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            <Link to='/logout'>Logout</Link>


        </div>
    )
}    