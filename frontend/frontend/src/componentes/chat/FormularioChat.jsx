import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UserContext } from '../../context/userContext'
import { createNoti, addAlarm, addCaseToUser, addUserToChat } from '../../api/auth'
import { CasosContext } from '../../context/casoContext'
import { ChatContext } from '../../context/chatContext'




export function FormAlarmas(){
    const {register, handleSubmit} = useForm()
    const { idUser } = useContext(UserContext)
    const {idCaso, setCasos, casos} = useContext(CasosContext)
    const { setForms } = useContext(ChatContext)

    const updatedCasos  = (alarmaID) => {
        const copyCasos = structuredClone(casos)
        const index = copyCasos.findIndex(caso => caso._id === idCaso[0])
        copyCasos[index].alarmas.push(alarmaID)
        setCasos(copyCasos)
    }
    return (
        <div className='flex flex-col gap-4 items-center'>
            <p className='font-bold text-2xl text-green-300 '>CREAR ALARMA CASO {idCaso[1].toUpperCase()}</p>
            <form className='flex flex-col self-start gap-6 w-full' onSubmit={handleSubmit(async (values) =>{
                const notificacion = {...values, creador : idUser, tipo : 'alarmas'}
                const rta = await createNoti(notificacion)
                // console.log(rta);
                if(rta.data.ok){
                    const { _id } = rta.data.notificacion
                    const rtaII = await addAlarm(idCaso[0], _id.toString())
                    // console.log(rtaII);
                    updatedCasos(_id.toString())
                    setForms('')
                }
            })}>
                <div className='flex flex-col self-start gap-2'>
                        <label className='self-start text-gray-200 text-xl'>Etiqueta:</label>
                        <input className='self-start text-black px-2 py-1 rounded-2xl' type="text" {...register('mensaje', {required : true })}/>
                </div>
                <div className='flex flex-col self-start gap-2'>
                        <label className='self-start  text-gray-200 text-xl'>Vencimiento:</label>
                        <input  className='self-start text-black px-2 py-1 rounded-2xl' type="datetime-local" {...register('vencimiento', {required : true})} />
                </div>
                <button className='self-end w-1/4 border-2 border-pink-300 px-1 py-2 rounded-2xl mr-5 bg-gray-500 hover:bg-black hover:text-green-300' type='submit'>Crear alarma</button>
            </form>
        </div>
    )
}
export function FormAddFriend(){
    const {  user } = useContext(UserContext)
    const {idCaso} = useContext(CasosContext)
    const {usersChat, chat, setUserChat, setForms} = useContext(ChatContext)
    const usuariosParaAgregar = () => {
        const idUsersChat = usersChat.map(user => user.id)
        const amigosParaAgregar = user.amigos.filter(user => !idUsersChat.includes(user._id))
        return amigosParaAgregar;
    }
    
    const addFriend = async (idUser, nombreUser) => {
        // console.log(e);
        const rta = await addCaseToUser(idUser, idCaso[0])
        console.log(rta);
        if (rta.data.ok) {
            const rtaII = await addUserToChat(idUser, chat[0] )
            console.log(rtaII);
            if(rtaII.data.ok){
                setUserChat([...usersChat, {id : idUser, nombre : nombreUser}])
                setForms('')
            }
        }
    

    }
    // console.log(usuariosParaAgregar());
    return (
        <div className='flex flex-col items-center gap-6 '>
            <h3 className='font-bold text-2xl text-green-300'>AGREGAR AMIGO AL {idCaso[1].toUpperCase()}</h3>
            {usuariosParaAgregar().length == 0 ? <p className='font-bold text-2xl text-green-800'>NO HAY AMIGOS POSIBLES PARA AGREGAR</p> :
            <div className='flex flex-col w-full gap-2 items-center'>
                {usuariosParaAgregar().map(usuario => (
                    <div className='agregar-amigo flex justify-around border-2 items-center border-gray-200 w-full px-4 py-2 rounded-2xl' key={usuario._id}>
                        <span className='text-xl'>{usuario.email}</span>
                        <button className={usuario._id} onClick={(e) => addFriend(e.target.className ,usuario.nombre)}>
                            Agregar al caso
                        </button>
                    </div>
                ))}
            </div>
            }
        </div>
    )

}








export function FormularioChat(){
    const {forms, setForms} = useContext(ChatContext)
    return(
        <section className='flex flex-col mt-5 '>
            <div>
                <button className='button-atras px-3 py-2 rounded-2xl bg-red-400 text-black hover:bg-red-500' onClick={() => setForms('')}>
                    Volver al chat
                </button>
            </div>
            {forms === "alarma" 
            ? <FormAlarmas /> 
            : <FormAddFriend />}
        
        </section>
    )
}