import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AxiosWithAuth from '../utils/AxiosWithAuth'

export default function () {
    const history = useHistory()

    useEffect(() => {
        AxiosWithAuth.get('/auth/logout')
            .catch((err) => console.error(err))
            .then(() => localStorage.removeItem('userID'))
            .finally(() => 
            history.push('/'))
    }, [history])
    return null
}
