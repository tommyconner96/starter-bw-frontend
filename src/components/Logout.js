import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function () {
    const history = useHistory()

    useEffect(() => {
        axios.get('https://starter-bw.herokuapp.com/auth/logout', { withCredentials: true })
            .catch((err) => console.error(err))
            .then(() => localStorage.removeItem('token'))
            .finally(() => 
            history.push('/'))
    }, [history])
    return null
}
