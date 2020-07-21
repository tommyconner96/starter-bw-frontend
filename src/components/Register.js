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
		axios.post('https://starter-bw.herokuapp.com/auth/register', payload)
			.then(() => history.push('/login'))
			.catch((err) => console.log(err.response.data.message))
	}

	return (
		<form onSubmit={handleSubmit}>
			<h1>Register</h1>
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