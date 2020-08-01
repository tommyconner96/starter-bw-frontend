import React, { useState, useEffect } from 'react'
import AxiosWithAuth from '../utils/AxiosWithAuth'
import { useHistory, Link } from 'react-router-dom'


export default function () {
    const [coffees, setCoffees] = useState([])
    const [load, setLoad] = useState(false)

    const history = useHistory()
    const userID = localStorage.getItem('userID')
    useEffect(() => {
        setLoad(false)
        AxiosWithAuth
            .get(`users/${userID}/coffee`)
            .then(res => {
                setCoffees(res.data)
                console.log('useEffect speaking')
            })
            .catch(err => {
                if (err.response) {
                    setCoffees(0)
                }
            })
    }, [load])

    function deleteCoffee(coffee) {
        AxiosWithAuth
            .delete(`users/${userID}/coffee/${coffee}`)
            .then(() => {
                console.log('delete coffee called')
                setLoad(true)
            })
            .catch(err => console.log(err))
    }
    if (load === true) {
        return (
            <div className='coffee-container'>
                <p>Loading.......</p>
            </div>
        )
    } else {
        if (coffees.length > 0) {
            return (
                <div className='coffee-container'>
                    <div className='coffee-box'>
                        {coffees.map((res) =>
                            <div className='coffee-each' key={res.id}>
                                <p>Origin: {res.origin}</p>
                                <p>Notes: {res.notes}</p>
                                <button onClick={() => history.push(`/edit-coffee/${res.id}`)}>
                                    Edit
                        </button>
                                <button onClick={() => deleteCoffee(res.id)}>Delete</button>
                                <br /><br />
                            </div>

                        )}
                        <Link to='/add-coffee'>Add Coffee</Link>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='coffee-container'>
                    <p>Looks like you don't have any coffee!</p>
                    <div className='coffee-box'>
                        <Link to='/add-coffee'>Add Coffee</Link>
                    </div>
                </div>
            )
        }
    }
}
