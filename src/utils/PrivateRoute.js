import React from 'react'
import cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import { Route, Redirect } from 'react-router-dom'
//this will take component and make it Component with a
//capital C so that it can be rendered in React
//renaming any remaining props to rest 
const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                //if we have the token, render component and props
                // const decoded = jwt.decode(cookie.get('token'))
                if (jwt.decode(cookie.get('token'))) {
                    return <Component {...props} />
                } else {
                    //else go back to the login page
                    return <Redirect to='/login' />
                }
            }}
        />
    )
}

export default PrivateRoute