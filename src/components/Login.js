import React, { useState } from 'react'
import AxiosWithAuth from '../utils/AxiosWithAuth'
import { useHistory } from 'react-router-dom'
import cookie from "js-cookie"


export default function() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const history = useHistory()
	
	const handleSubmit = (e) => {
		e.preventDefault()
		const payload = { username, password }
        // `withCredentials` option is required to automatically save/send cookies
        AxiosWithAuth.post('/auth/login', payload,)
			.then((res) => {
				console.log('login')
				cookie.set('token', (res.data.token))
				// implement a cookie for this upon refactoring to context
				localStorage.setItem('userID', res.data.user_id)
				history.push('/coffee')
			})
			.catch((err) => console.log(err))
	}

	return (
		<form onSubmit={handleSubmit}>
			<h1>Login</h1>
			<input
				type='text'
				placeholder='Username'
				value={username}
				onChange={e => setUsername(e.target.value)}
			/>
			<input
				type='password'
				placeholder='Password'
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>

			<button type='submit'>Submit</button>
		</form>
	)
}