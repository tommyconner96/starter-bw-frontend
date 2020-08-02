import { atom } from 'recoil'

const userState = atom({
    key: 'user',
    default: { username: '', password: '', phoneNumber: '' }

})

const coffeeState = atom({
    key: 'coffee',
    default: {
        id: '',
        user_id: '',
        origin: '',
        notes: ''
    },
})

const coffeeListState = atom({
    key: 'coffee-list',
    default: []
})

export { userState, coffeeState, coffeeListState }

