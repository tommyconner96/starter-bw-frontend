import React from 'react'
import AxiosWithAuth from '../utils/AxiosWithAuth'
import { useHistory } from 'react-router-dom'
import cookie from "js-cookie"
import { useRecoilState } from 'recoil'
import { userState } from '../store'


export default function () {
	const [login, setLogin] = useRecoilState(userState)

	const history = useHistory()

	const handleSubmit = (e) => {
		e.preventDefault()
		AxiosWithAuth.post('/auth/login', login)
			.then((res) => {
				console.log('login')
				cookie.set('token', (res.data.token))
				// implement a cookie for this upon refactoring to context
				localStorage.setItem('userID', res.data.user_id)
				history.push('/coffee')
				setLogin({username:'', password:'', phoneNumber:''})
			})
			.catch((err) => console.log(err))
	}

	const handleChange = (e) => {
		e.preventDefault()
		setLogin({
			...login, [e.target.name]: e.target.value
		})
		console.log(login)
	}

	return (
		<form onSubmit={handleSubmit}>
			<h1>Login</h1>
			<input
				type='text'
				name='username'
				placeholder='Username'
				value={login.username}
				onChange={handleChange}
			/>
			<input
				type='password'
				name='password'
				placeholder='Password'
				value={login.password}
				onChange={handleChange}
			/>

			<button type='submit'>Submit</button>
		</form>
	)
}