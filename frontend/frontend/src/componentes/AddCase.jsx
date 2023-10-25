
import { useForm } from 'react-hook-form'
import { addCase } from '../api/auth';
import { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

export function AddCase () {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const {setRefresh, user} = useContext(UserContext)

    const mappedAmigos = !user?.amigos ? [] : user.amigos.map(friend => ({
        id : friend._id,
        email : friend.email
    }))
    
    const [amigosCaso, setAmigosCaso] = useState([])

    const handleCaso = (e) => {
        const casoAmigos = structuredClone(amigosCaso)
        if(e.target.checked){
            casoAmigos.push(e.target.className)
        }else{
            const index = casoAmigos.findIndex(caso => caso == e.target.className)
            casoAmigos.splice(index, 1)
        }
        setAmigosCaso(casoAmigos)
    }
    return (
        <div className='container-addcase flex flex-col py-5 px-5 mt-10 gap-10 max-w-screen-md flex-wrap m-auto p-3 bg-zinc-800 rounded-2xl '>
            <div className='flex justify-around items-center'>
                <h2 className='text-green-400 text-xl font-bold'>Agregar Caso</h2>
                <button onClick={() => navigate('/')} className='px-3 py-2 rounded-2xl bg-red-400 text-black hover:bg-red-500'>Volver al inicio</button>
            </div>
            <form className='form-addcase flex flex-col gap-5' onSubmit={handleSubmit(async (values) => {
                const rta = await addCase(values, amigosCaso)
                if(rta.data.ok){
                    navigate('/')
                    setRefresh(true)
                }
            })}>
                <div className="flex flex-wrap gap-2">
                    <input className='text-black px-1 py-1 rounded-2xl' type="text" placeholder='Nombre' {...register('nombre', {required : true})} />
                    <input className='text-black px-1 py-1 rounded-2xl'  type="text" placeholder='Apellido' {...register('apellido', {required : true})} />
                    <input className='text-black px-1 py-1 rounded-2xl'  type="number" placeholder='Documento' {...register('documento', {required : true})} />
                    <input className='text-black px-1 py-1 rounded-2xl'  type="number" placeholder='Cuil' {...register('cuil', {required : true})} />
                    <input className='text-black px-4 py-1 rounded-2xl'  type="date" {...register('fechaNac', {required : true})} />
                </div>
                <div className='flex flex-col gap-4 pb-2'>
                    <div className='flex justify-around border-2 border-black py-2 px-2 rounded-2xl'>
                        <div>
                            <label>Reconocimiento ANSES</label>
                            <input type="checkbox" {...register('recoAnses')} />
                        </div>
                        <div>
                            <label>Reconocimiento IPS</label>
                            <input type="checkbox" {...register('recoIPS')} /> 
                        </div>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <label className=''>Tipo de jubilacion</label>
                        <select className='rounded-xl py-1 px-1 text-black' {...register('tipoJubilacion')}>
                                <option value="OTRA">OTRA</option>
                                <option value="DOCENTE IPS">DOCENTE IPS</option>
                                <option value="IPS">IPS</option>
                                <option value="ANSES">ANSES</option>
                                <option value="MIXTA IPS-ANSES">MIXTA IPS-ANSES</option>
                                <option value="MIXTA ANSES-IPS">MIXTA ANSES-IPS</option>
                        </select>
                    </div>
                </div>
                {mappedAmigos.length != 0 && 
                <div className='flex flex-col gap-4 '>
                    <label className='text-green-400 text-xl font-bold '>Agregar amigos al caso</label>
                    <ul className='add-friend-lista flex flex-col gap-2'>
                        {mappedAmigos.length > 0 && mappedAmigos.map(friend => (
                            <div key={friend.id}>
                                <label>{friend.email}</label>
                                <input className={friend.id} type='checkbox' onChange={handleCaso}/>
                            </div>
        
                        ))}
                    </ul>
                </div>}

                <button className='border-2 w-1/4 self-end border-pink-300 px-1 py-2 rounded-2xl mr-5 bg-gray-500 hover:bg-black hover:text-green-300' type='submit'>Crear caso</button>

            </form>
        </div>
    )
}