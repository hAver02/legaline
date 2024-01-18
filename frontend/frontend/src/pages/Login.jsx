
import {set, useForm} from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { loginReques } from '../api/auth'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'

export function Login () {
    const { setIsAuth, setIdUser} = useContext(UserContext)
    const { register, handleSubmit } = useForm()
    const [loginError, setLoginError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if(loginError){
            setTimeout(() => {
                setLoginError('')
            }, 3000)
        }
    }, [loginError])


    return (
        <div className='container-login flex h-4/5 w-3/6 m-auto py-10'>
        <div className='login bg-gray-900 w-full h-full flex flex-col gap-5 items-center rounded-3xl p-10'>
            <h1 className='text-5xl text-green-300 font-semibold'>LegalLine-Chat</h1>
            {loginError && <p className='mensaje-error'>{loginError}</p>} 
            
            <form className='login-form flex flex-col gap-6 t-5' 
                onSubmit={handleSubmit(async (values) => {
                    const valores = {...values, email : values.email.toLowerCase()}
                    try {
                        const rta = await loginReques(valores)
                        if(rta.data.ok){
                            setIsAuth(true)
                            setIdUser(rta.data.userID)
                            navigate('/')
                        }else{
                            setLoginError(rta.data.message.toUpperCase())
                        }
                    } catch (error) {
                        setLoginError('error al ingresar a la cuenta')
                    }
            })}>
                <div className='login-datos flex flex-col gap-3 pt-10'>
                    <input className='text-black p-1 border-2 border-green-400 rounded-2xl' type="text" placeholder='email' {...register('email', { required : true})}/>
                    <input className='text-black p-1 border-2 border-green-400 rounded-2xl' type="password" placeholder='password' {...register('password', { required : true})}/>
                </div>
                <button type='submit' className='text-gray-400 border-2 border-green-300 p-1 rounded-2xl cursor-pointer'>
                    Iniciar sesion
                </button>
            </form>
            <div className='flex flex-col mt-10 gap-1'>
                <p className="text-red-300 text-xl">¿Necesitas crear una cuenta? <Link to={'/register'} className='cursor-cover hover:text-red-600'>Registrarse</Link></p>
                <p className='text-red-300 text-xl'>¿Olvidaste tu contraseña? <Link  className='cursor-cover hover:text-red-600' to={'/recovery-pass'}>Recuperar Contraseña</Link></p>
            </div>
        </div>
        </div>
    )

}