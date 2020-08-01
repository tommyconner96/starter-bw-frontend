import React, { useState, useEffect } from 'react'
import AxiosWithAuth from '../utils/AxiosWithAuth'
import { useHistory } from 'react-router-dom'

const initialState = {
    origin: '',
    notes: ''
}

export default function (props) {
    const [edit, setEdit] = useState(initialState)
    // const [origin, setOrigin] = useState('')
    // const [notes, setNotes] = useState('')

    const history = useHistory()
    const coffeeID = props.match.params.id

    useEffect(() => {
        const userID = localStorage.getItem('userID')
        AxiosWithAuth
            .get(`users/${userID}/coffee/${coffeeID}`)
            .then((res) => {
                res.data = {
                    ...res.data,
                    origin: res.data.origin,
                    notes: res.data.notes
                }
                setEdit(res.data)
                console.log(edit)
            })
            .catch((err) => console.log(err))
    }, [coffeeID])

    const handleSubmit = (e) => {
        const userID = localStorage.getItem('userID')
        e.preventDefault()
        console.log(edit)

        AxiosWithAuth.put(`users/${userID}/coffee/${coffeeID}`, edit)
            .then((res) => {
                console.log('edit coffee', res)
                history.push(`/coffee`)
            })
            .catch((err) => console.log(err))
    }

    const handleChange = (e) => {
        e.preventDefault()
        setEdit ({
            ...edit, [e.target.name]: e.target.value
        })
        console.log(edit)
    }

    
    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit Coffee</h1>
            <input
                type='text'
                name='origin'
                placeholder='Origin'
                value={edit.origin}
                onChange={handleChange}
            />
            <input
                type='text'
                name='notes'
                placeholder='Notes'
                value={edit.notes}
                onChange={handleChange}
            />

            <button type='submit'>Submit</button>
        </form>
    )
}