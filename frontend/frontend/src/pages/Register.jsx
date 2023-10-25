

import { useForm } from "react-hook-form"
import { registerRequest } from "../api/auth";
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";




export function Register(){

const { setIdUser, setIsAuth } = useContext(UserContext)
const {register, handleSubmit} = useForm()
const navigate = useNavigate()
const [registerError, setRegisterErrror] = useState('')

useEffect(() => {
    if(registerError){
        setTimeout(() => {
            setRegisterErrror('')
        }, 3000)
    }
}, [registerError])
return (
        <div className="flex h-4/5 w-3/6 m-auto py-10">
            <div className="bg-gray-900 w-full h-full flex flex-col gap-5 items-center rounded-3xl p-10">
                <h2 className="text-4xl text-green-300 font-semibold">Formulario de Registro</h2>
                {registerError && <p className="register-error">{registerError}</p>}
                <form className="login-form flex flex-col gap-6 t-5"
                        onSubmit={handleSubmit(async (values) => {
                            const valores = {...values, email: values.email.toLowerCase()}
                            const rta = await registerRequest(valores)
                            if(rta.data.ok) {
                                setIdUser(rta.data.userID)
                                navigate("/")
                                setIsAuth(true)
                            }else{
                                if (rta.data.message.includes('duplicate')) return setRegisterErrror('Email utilizado anteriormente')
                                setRegisterErrror('Error al crear usuario. Intente nuevamente')
                            }
                        })}
                        >
                        <div className="login-datos flex flex-col gap-3 pt-10">
                            <input className='text-black p-1 border-2 border-green-400 rounded-2xl'  type="text" placeholder="Nombre" {...register("nombre", {required : true}) }/>
                            <input className='text-black p-1 border-2 border-green-400 rounded-2xl'  placeholder="Email" type="email "{...register("email", {required : true}) }/>
                            <input className='text-black p-1 border-2 border-green-400 rounded-2xl'  placeholder="Password" type="password"{...register("password", {required : true}) }/>
                        </div>
                        <button className='text-gray-400 border-2 border-green-300 p-1 rounded-2xl cursor-pointer hover:p-2' type="submit">
                            Registrarse
                        </button>
                </form>             
                <p className='text-red-300 text-xl'>¿Ya tienes una cuenta? <Link className='cursor-cover hover:text-red-600' to={'/login'}>Login</Link></p>
            </div>

        </div>
)}
