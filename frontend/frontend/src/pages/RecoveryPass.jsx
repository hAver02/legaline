import { useForm } from "react-hook-form"
import { changePassword, recoveryPassword } from "../api/auth"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"



export function RecoveryPass(){
    const { register, handleSubmit } = useForm()
    const [sentForm, setSentForm] = useState(false)
    const navigate = useNavigate()
    // console.log(sentForm);
    return (
        <div className="flex h-4/5 w-3/6 m-auto py-10" >
            <div className="bg-gray-900 w-full h-full flex flex-col gap-5 items-center rounded-3xl pt-20 relative">
                <button onClick={() => {
                    navigate('/login')
                }} className="absolute  left-20 top-5 text-gray-400 border-2 border-green-300 py-1 px-3 rounded-2xl cursor-pointer">Inicio</button>
                <h1 className="text-4xl text-green-300 font-semibold">Recuperar contraseña</h1>
                <p className="text-xl text-green-200">Ingrese el mail de la cuenta a recuperar</p>
                <form className="flex flex-col justify-between items-center gap-5" 
                onSubmit={handleSubmit(async (values) => {
                    const rta = await recoveryPassword(values)
                    // console.log(rta);
                    setSentForm(true)
                })}>
                    <input type="text" className='text-black p-1 border-2 border-green-400 rounded-2xl'  placeholder='email' {...register('email', { required : true})}/>
                    <button className='text-gray-400 border-2 border-green-300 p-2 rounded-2xl cursor-pointer hover:p-2 ' type="submit">Recuperar contraseña</button>
                    {sentForm && <p className=""> Se ha enviado el link al correo</p> }
                </form>
            </div>
        </div>
    )
}

// abajo otro componente! sacarlo!





export function NewPassword(){
    const { register, handleSubmit } = useForm()
    const currentURL = new URL(window.location.href)
    const queryParams = new URLSearchParams(currentURL.search)
    const token = queryParams.get('token')
    const navigate = useNavigate()

    const [newPasswordOk, setNewpasswordOk] = useState(false)
    return(
        <div className="h-4/5 max-w-3xl m-auto pt-10 border border-gray-800 flex flex-col">
            <div>
                <form onSubmit={handleSubmit(async (values) => {
                    const { password, password2 } = values
                    if(password != password2) return // marcar error en el UI
                    const rta = await changePassword(password,password2,token)
                    console.log(rta);
                    if(rta.ok) {
                        setNewpasswordOk(true)
                        setTimeout(() => {
                            navigate('/login')
                        })
                    }
                })}>

                    <div>
                        <label htmlFor="">Ingrese su nueva contraseña</label>
                        <input type="password"  {...register('password', {required : true})} 
                            className="text-black"
                            />
                    </div>
                    <div>
                        <label htmlFor="">Ingrese su nueva contraseña nuevamente</label>
                        <input type="password" {...register('password2', {required : true})} 
                            className="text-black"
                            />
                    </div>
                    <button type="submit">Cambiar contraseña</button>
                    <div>
                        {newPasswordOk && <p>Password cambiada exitosamente!</p>}
                    </div>
                </form>
            </div>
        </div>
    )

}