import React, { useEffect } from 'react'
import AxiosWithAuth from '../utils/AxiosWithAuth'
import { useHistory } from 'react-router-dom'
import { useRecoilState, useRecoilValue, selector } from 'recoil'
import { coffeeState, editingCoffee, loading, coffeeListState } from '../store'
import { userID } from './App'


export default function (props) {
    const [edit, setEdit] = useRecoilState(coffeeState)
    const [load, setLoad] = useRecoilState(loading)
    const [editing, setEditing] = useRecoilState(editingCoffee)
    const history = useHistory()
    const coffeeID = localStorage.getItem("editCoffee")

    useEffect(() => {

        AxiosWithAuth
            .get(`users/${userID}/coffee/${coffeeID}`)
            .then((res) => {
                res.data = {
                    ...res.data,
                    origin: res.data.origin,
                    notes: res.data.notes,
                    id: coffeeID
                }
                setEdit(res.data)
                console.log(edit)
            })
            .catch((err) => console.log(err))
            return history.listen((location) => {
                setEditing(false)
                console.log(`Closing the Edit component`)
            })
    }, [history, setEditing])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(edit)
        localStorage.removeItem("editCoffee")
        AxiosWithAuth.put(`users/${userID}/coffee/${coffeeID}`, edit)
            .then((res) => {
                console.log('edit coffee', res)
                history.push(`/coffee`)
                setEdit(0)
                setEditing(false)
                setLoad(true)
            })
            .catch((err) => console.log(err))
    }

    const handleChange = (e) => {
        e.preventDefault()
        console.log(edit)
        setEdit ({
            ...edit, [e.target.name]: e.target.value
        })
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