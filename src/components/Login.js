import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


export default function() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const history = useHistory()
	
	const handleSubmit = (e) => {
		e.preventDefault()
		const payload = { username, password }
        // `withCredentials` option is required to automatically save/send cookies
        // use this for all CRUD requests on protected routes on the BW project
        // (in this project, coffee is a protected route)
        // axios.post('https://starter-bw.herokuapp.com/auth/login', payload, { withCredentials: true })
        axios.post('https://starter-bw.herokuapp.com/auth/login', payload, {withCredentials: true})
			.then(() => {
				console.log('login')
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