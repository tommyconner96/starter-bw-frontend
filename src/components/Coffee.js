import React, { useEffect } from 'react'
// import { userID } from './App'
import AxiosWithAuth from '../utils/AxiosWithAuth'
import { useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { coffeeListState, addingCoffee, loading, editingCoffee } from '../store'
import AddCoffee from './AddCoffee'
import EditCoffee from './EditCoffee'
import CoffeeBox from './CoffeeBox'
import cookie from 'js-cookie'



export default function (props) {
    const [coffees, setCoffees] = useRecoilState(coffeeListState)
    const [load, setLoad] = useRecoilState(loading)
    const [adding, setAdding] = useRecoilState(addingCoffee)
    const [editing, setEditing] = useRecoilState(editingCoffee)

    const userID = cookie.get('userID')

    const history = useHistory()
    useEffect(() => {
        setLoad(false)
        AxiosWithAuth
            .get(`/users/${userID}/coffee`)
            .then(res => {
                setCoffees(res.data)
                console.log('useEffect in coffee.js')
                console.log(userID)
                console.log(coffees)
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
                        {/* {coffees.map((res) =>
                            <div className='coffee-each' key={res.id}>
                                <p>Origin: {res.origin}</p>
                                <p>Notes: {res.notes}</p>
                                {editing === false &&
                                    <button onClick={() => setEditing(true)}>
                                        Edit Coffee
                                </button>
                                }

                                <button onClick={() => deleteCoffee(res.id)}>
                                    Delete
                                </button>
                                <br /><br />
                            </div>
                        )} */}
            {coffees.map((coffee) =>
                <CoffeeBox coffees={coffee}/>
            )}

{editing === true && 
                                 <EditCoffee coffeeID={coffees.id} />
                                }
                        {adding === true &&
                            <AddCoffee />
                        }
                        {adding === false &&
                            <button onClick={() => setAdding(true)}>
                                Add Coffee
                            </button>
                        }
                    </div>
                </div>
            )
        } else {
            return (
                <div className='coffee-container'>
                    <p>Looks like you don't have any coffee!</p>
                    <div className='coffee-box'>
                        {adding === false &&
                            <button onClick={() => setAdding(true)}>Add Coffee</button>
                        }
                        {adding === true &&
                            <AddCoffee />
                        }
                    </div>
                </div>
            )
        }
    }
}
