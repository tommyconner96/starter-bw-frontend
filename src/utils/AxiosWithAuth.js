// First we need to import axios.js
import axios from 'axios'
// Next we make an 'instance' of it
const instance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://starter-bw.herokuapp.com'
    // baseURL: 'http://localhost:5000'
})
instance.defaults.withCredentials = true

export default instance