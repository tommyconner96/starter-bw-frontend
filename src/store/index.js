import { atom, selector, useRecoilValue } from 'recoil'
// User state. Called any time we need to interact with user state whether it is
// Registration, Login, or editing account.
const userState = atom({
    key: 'user',
    default: { username: '', password: '', phoneNumber: '' }

})


// coffeeState is called any time we need to do any CRUD interaction with a coffee
const coffeeState = atom({
    key: 'coffee',
    default: {
        id: '',
        user_id: '',
        origin: '',
        notes: ''
    },
})



// Used any time we need any CRUD interaction with array of coffees
const coffeeListState = atom({
    key: 'coffee-list',
    default: []
})



// Boolean used for whether or not coffee is being added.
const addingCoffee = atom({
    key: 'add',
    default: false
})

const editingCoffee = atom({
    key: 'edit',
    default: false
})

// Boolean used for whether or not something is loading
const loading = atom({
    key: 'load',
    default: false
})

export {
    userState,
    coffeeState,
    coffeeListState,
    addingCoffee,
    editingCoffee,
    loading
}
