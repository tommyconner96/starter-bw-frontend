import React, { useState } from 'react'
import AxiosWithAuth from '../utils/AxiosWithAuth'
import { useHistory } from 'react-router-dom'

export default function() {
	const [register, setRegister] = useState({ username: '', password: '', phoneNumber: '' })
    
    const history = useHistory()
	
	const handleSubmit = (e) => {
		e.preventDefault()
		AxiosWithAuth.post('auth/register', register)
			.then(() => {
				history.push('/login')
				setRegister({username:'', password:'', phoneNumber:''})
			})
			.catch((err) => console.log(err))
	}

	const handleChange = (e) => {
		e.preventDefault()
		setRegister({
			...register, [e.target.name]: e.target.value
		})
		console.log(register)
	}

	return (
		<form onSubmit={handleSubmit}>
			<h1>Register</h1>
			<input
				type='text'
				name='username'
				placeholder='Username'
				value={register.username}
				onChange={handleChange}
			/>
			<input
				type='password'
				name='password'
				placeholder='Password'
				value={register.password}
				onChange={handleChange}
			/>
			<input
				type='phone'
				name='phoneNumber'
				placeholder='Phone'
				value={register.phoneNumber}
				onChange={handleChange}
			/>

			<button type='submit'>Submit</button>
		</form>
	)
}