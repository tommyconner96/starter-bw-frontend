import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function () {
    const history = useHistory()

    useEffect(() => {
        axios.get('http://localhost:5000/auth/logout', { withCredentials: true })
            .catch((err) => console.error(err))
            .finally(() => history.push('/'))
    }, [history])
    return null
}
