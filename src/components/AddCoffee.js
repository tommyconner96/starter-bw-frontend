import React, { useEffect } from 'react'
import AxiosWithAuth from '../utils/AxiosWithAuth'
import { useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { coffeeState, addingCoffee, loading } from '../store'
import { userID } from './App'

export default function () {
    // Recoil Hook for the form data for added coffee
    const [add, setAdd] = useRecoilState(coffeeState)
    // True or false Recoil hook for whether coffee is currently being added.
    const [adding, setAdding] = useRecoilState(addingCoffee)
    // See Coffee.js for implementation
    // Hook for whether or not data is loading.
    const [load, setLoad] = useRecoilState(loading)
    const history = useHistory()

    useEffect(() => {
        return history.listen((location) => {
            setAdding(false)
            console.log(`Closing the AddCoffee component`)
        })
    }, [history])

    const handleSubmit = (e) => {
        e.preventDefault()
        AxiosWithAuth
            // posts to api
            .post(`users/${userID}/coffee`, add)
            .then(response => {
                console.log('add coffee', response)
                // history.push will call the useEffect and setAdding false to close
                // the AddCoffee form.
                history.push('/coffee')
                setAdd(0)
                setLoad(true)
            })
            .catch(err => console.log(err))

    }

    const handleChange = (e) => {
        e.preventDefault()
        console.log(userID)
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
