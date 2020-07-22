import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function () {
    const [coffees, setCoffees] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:5000/coffee', { withCredentials: true })
            .then(res => {
                setCoffees(res.data)
            })
            .catch(err => console.log(err))
    })

    return (
        <div className='coffee-container'>
            <div className='coffee-box'>
                {coffees.map((res) =>
                    <div className='coffee-each' key={res.id}>
                        <p>Origin: {res.origin}</p>
                        <p>Notes: {res.notes}</p>
                    </div>
                )}
            </div>
        </div>
    )
}