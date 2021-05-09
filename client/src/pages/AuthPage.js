import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/Auth.contex'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage ()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email:'', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    },[error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()             //делаем инпуты активынми
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async() => {
        try {
            const data = await request('./api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {                   // обработан в useHttp
        }
    }

    const loginHandler = async() => {
        try {
            const data = await request('./api/auth/login', 'POST', {...form})
            //message(data.message)
            auth.login(data.token, data.userId)
        } catch (e) {                   // обработан в useHttp
        }
    }


    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи Ссылку</h1>
                <div className="card blue darkin-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                    <div>
                        
                    <div className="input-field col s6">
                        <input
                        placeholder="Введите email"
                        id="email"
                        type="text"
                        name="email"
                        className="yellow-input"
                        value={form.email}
                        onChange={changeHandler}
                        />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="input-field col s6">
                        <input
                        placeholder="Введите пароль"
                        id="password" 
                        type="password"                     //чтобы ввод не было видно
                        name="password"
                        className="yellow-input"
                        value={form.password}
                        onChange={changeHandler}
                        />
                        <label htmlFor="email">Пароль</label>
                    </div>

                    </div>
                </div>
            <div className="card-action">
                <button 
                className="btn yellow darken-4" 
                style={{ marginRight:10 }}
                disable={loading}
                onClick={loginHandler}
                >
                    Войти
                </button>
                <button 
                className="btn grey lighten-1 black-text"
                onClick={registerHandler}
                disable={loading}
                >
                    Регистрация
                </button>
            </div>
        </div>
        </div> 
    </div>
    )
}