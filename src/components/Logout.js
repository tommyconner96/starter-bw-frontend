import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AxiosWithAuth from '../utils/AxiosWithAuth'
import cookie from "js-cookie"
import { useRecoilState } from 'recoil'
import { userState } from '../store'

export default function () {
    const [login, setLogin] = useRecoilState(userState)
    const history = useHistory()

    useEffect(() => {
        AxiosWithAuth.get('/auth/logout')
            .catch((err) => console.error(err))
            .then(() => {
                setLogin({ username: '', password: '', phoneNumber: '' })
                cookie.remove('token')
                cookie.remove('userID')
            })
            .finally(() => 
            history.push('/'))
    }, [history])
    return null
}
