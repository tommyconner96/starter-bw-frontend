import React, { useEffect } from 'react'
// import { userID } from './App'
import AxiosWithAuth from '../utils/AxiosWithAuth'
import { useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { coffeeListState, coffeeState, addingCoffee, editingCoffee, loading } from '../store'
import AddCoffee from './AddCoffee'
import EditCoffee from './EditCoffee'
import cookie from 'js-cookie'



export default function (props) {
    const [coffees, setCoffees] = useRecoilState(coffeeListState)
    const [form, setForm] = useRecoilState(coffeeState)
    const [editing, setEditing] = useRecoilState(editingCoffee)
    const [adding, setAdding] = useRecoilState(addingCoffee)
    const [load, setLoad] = useRecoilState(loading)
    const userID = cookie.get('userID')


    function deleteCoffee(coffee) {
        setEditing(false)
        setAdding(false)
        setCoffees(0)
        setForm(0)
        AxiosWithAuth
            .delete(`users/${userID}/coffee/${coffee}`)
            .then(() => {
                console.log('delete coffee called')
                setLoad(true)
            })
            .catch(err => console.log(err))
    }

    function editCoffee(coffee) {
        localStorage.setItem("editCoffee", coffee)
        setLoad(true)
        setEditing(true)
    }

    return (
        <div key={props.coffees.id} className='coffee-box'>
            <div className='coffee-each' >
                <p>Origin: {props.coffees.origin}</p>
                <p>Notes: {props.coffees.notes}</p>
                <button onClick={() => editCoffee(props.coffees.id)}>
                    Edit Coffee
                                </button>
                <button onClick={() => deleteCoffee(props.coffees.id)}>
                    Delete
                                </button>
                <br /><br />
            </div>
            {/* {editing === true &&
                                    <EditCoffee coffeeID={props.coffees.id} />
                                } */}
        </div>
    )
    // } else {
    //     return (
    //         <div className='coffee-container'>
    //             <p>Looks like you don't have any coffee!</p>
    //             <div className='coffee-box'>
    //                 {adding === false &&
    //                     <button onClick={() => setAdding(true)}>Add Coffee</button>
    //                 }
    //                 {/* {adding === true &&
    //                     <AddCoffee />
    //                 } */}
    //             </div>
    //         </div>
    //     )
    // }
    //     }
}
