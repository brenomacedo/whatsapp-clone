import React, { Dispatch, FC, SetStateAction } from 'react'
import firebase from 'firebase'
import api from '../api/api'
import './Login.css'


interface LoginProps {
    onReceive: (u: firebase.User) => Promise<void>
}

const Login: FC<LoginProps> = ({ onReceive }) => {

    const handleFacebookLogin = async () => {
        let result = await api.fbPopup()
        if(result.user) {
            onReceive(result.user)
        } else {
            alert('erro')
        }
    }

    return (
        <div className="Login">
            <button onClick={handleFacebookLogin}>Logar com o facebook</button>
        </div>
    )
}

export default Login