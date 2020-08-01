import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AxiosWithAuth from '../utils/AxiosWithAuth'
import cookie from "js-cookie"

export default function () {
    const history = useHistory()

    useEffect(() => {
        AxiosWithAuth.get('/auth/logout')
            .catch((err) => console.error(err))
            .then(() => {
                localStorage.removeItem('userID')
                cookie.remove('token')
            })
            .finally(() => 
            history.push('/'))
    }, [history])
    return null
}
