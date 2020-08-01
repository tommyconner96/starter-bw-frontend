import React, { useState } from 'react'
import AxiosWithAuth from '../utils/AxiosWithAuth'
import { useHistory } from 'react-router-dom'

const initialState = {
    origin: '',
    notes: ''
}

export default function () {
    const [add, setAdd] = useState(initialState)
    const history = useHistory()
    const userID = localStorage.getItem("userID")

    const handleSubmit = (e) => {
        e.preventDefault()

        AxiosWithAuth
            // posts to api
            .post(`users/${userID}/coffee`, add)
            .then(response => {
                console.log('add coffee', response)
                history.push('/coffee')
            })
            .catch(err => console.log(err))

    }

    const handleChange = (e) => {
        e.preventDefault()
        setAdd({
            ...add, [e.target.name]: e.target.value
        })
        console.log(add)
    }


    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Coffee</h1>
            <input
                type='text'
                name='origin'
                placeholder='Origin'
                value={add.origin}
                onChange={handleChange}
            />
            <input
                type='text'
                name='notes'
                placeholder='Notes'
                value={add.notes}
                onChange={handleChange}
            />

            <button type='submit'>Submit</button>
        </form>
    )
}
