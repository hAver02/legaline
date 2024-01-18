import { useEffect, useState } from "react";
import { addFriend } from '../../api/auth';
import { logOut } from "../../api/auth";
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export function DropMenu () {

    const [isOpen, setIsOpen] = useState(false);
    const [ agregarAmigo, setAgregarAmigo ] = useState(false)
    const [error, setError ] = useState(false)
    const [solicitud, setSolicitud ] = useState(false)

    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleAddFriendForm = () => {
        setAgregarAmigo(!agregarAmigo)
    };
    
    useEffect(() => {
        if(!error && !solicitud) return
        if(error){
            setTimeout(() =>{
                setError(false)
                setIsOpen(false)
                setAgregarAmigo(false)
            }, 2000)
        }
        if(solicitud){
            setTimeout(() =>{
                setSolicitud(false)
                setIsOpen(false)
                setAgregarAmigo(false)
            }, 2000)
        }
    },[error, solicitud])

    return (
        <div className="dropdown-menu relative inline-block">
            <button className=" menu-button bg-green-400 text-white rounded-2xl py-4 px-6 cursor-pointer" onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
        {isOpen && (
            <div className="options absolute top-full right-0 bg-gray-600 w-[250px] flex flex-col opacity-0">
                <button className="option px-5 py-3 bg-gray-600 text-blue-500 cursor-pointer hover:text-green-400" 
                    onClick={() => {
                        setAgregarAmigo(true) 
                        setIsOpen(false)
                    }}
                >
                    Agregar amigos
                </button>
                <button className="option px-5 py-3 bg-gray-600 text-blue-500 cursor-pointer hover:text-green-400"
                    onClick={async () => {
                        const rta = await logOut()
                        setIsOpen(false)
                    
                        navigate('/login')
                    }}
                >
                    Logout
                </button>
            </div>
        )}

        {agregarAmigo && (
                    <form className="add-friend-form absolute top-full right-0 bg-gray-600 flex flex-col gap-3 items-center w-[250px] py-3" 
                        onSubmit={handleSubmit(async (values) => {
                            console.log(values);
                            const rta = await addFriend(values.emailFriend)
                            console.log(rta);
                            if (!rta.data.ok) setError(true)
                            else setSolicitud(true)                        
                    })}>
                        <div className=" flex flex-col gap-1">
                            <label className="text-blue-200">Ingrese el mail del usuario</label>
                            <input className="rounded-xl py-2 px-1 text-black" type="email" placeholder="Correo electrónico" {...register('emailFriend', { required : true })}/>
                        </div>

                        {error && <p className="text-green-200">User no valido o ya agregado</p>}
                        {solicitud && <p className="text-green-200">Usuario agregado correctamente</p>}

                        <div className="flex gap-5">
                            <button className="py-1 px-2 bg-gray-400 cursor-pointer rounded-xl hover:text-red-300" onClick={toggleAddFriendForm}>
                                Cancelar
                            </button>
                            <button type="submit" className="py-1 px-2 bg-gray-400 text-green-200 cursor-pointer rounded-xl hover:text-green-500">
                                Agregar
                            </button>
                        </div>
                </form>
        )}
        </div>

    );
};