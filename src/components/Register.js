import React, { useState } from 'react'
import AxiosWithAuth from '../utils/AxiosWithAuth'
import { useHistory } from 'react-router-dom'

export default function() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [phoneNumber, setPhone] = useState('')
    
    const history = useHistory()
	
	const handleSubmit = (e) => {
		e.preventDefault()
		const payload = { username, password, phoneNumber }
		AxiosWithAuth.post('auth/register', payload,)
			.then(() => history.push('/login'))
			.catch((err) => console.log(err))
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
						<input
				type='phone'
				placeholder='Phone'
				value={phoneNumber}
				onChange={e => setPhone(e.target.value)}
			/>

			<button type='submit'>Submit</button>
		</form>
	)
}