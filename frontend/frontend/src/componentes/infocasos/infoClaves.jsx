import { useContext } from "react"
import { CasosContext } from "../../context/casoContext"


export function InfoClaves({ claves, addClave, handleEditUser }){

    const { isEditing, setDatosCaso, datosCaso} = useContext(CasosContext)

    const changeClaves = (e) => {
        e.preventDefault()
        const { value, name } = e.target
        const ind = claves.findIndex(cla => cla.nombre == e.target.className)
        if(ind != -1) { 
            name == "nombre" ? claves[ind].nombre = value : claves[ind].contraseña = value
            setDatosCaso({...datosCaso, claves : claves})
        }
    }

    const deleteClave = (nombre) => {
        // console.log(e.target.className);
        const ind = claves.findIndex(cla => cla.nombre ===  nombre)
        if(ind === -1) return
        claves.splice(ind, 1)
        const updateCaso = ({...datosCaso, claves : claves})
        handleEditUser(updateCaso)
    }

    return (
        <div className="w-full flex gap-1 flex-col px-2">
            <div>
                <h3 className='text-center text-xl font-bold text-pink-300'>CLAVES DEL CASO</h3>
            </div>
            {claves.map(clav => (
                <div key={clav.nombre} className=" flex flex-col gap- p-1 w-full">
                    <div className="flex justify-between items-center gap-2 border-2 border-gray-800 rounded-2xl px-3 py-2">

                        <div className="flex gap-1 items-center">
                                <label className="font-bold text-xl">Cuenta:</label>
                                {isEditing 
                                ? ( <input className={clav.nombre}  type="text" name="nombre" value={clav.nombre} onChange={changeClaves} />)
                                : ( <span className="text-base">{clav.nombre}</span>)
                                }   
                        </div>

                        <div className="flex gap-1 items-center">
                            <label className="font-bold text-xl">Contraseña:</label>
                            {isEditing 
                            ? ( <input className={clav.nombre} type="text" name="contraseña" value={clav.contraseña} onChange={changeClaves} />)
                            : ( <span className="text-base">{clav.contraseña}</span>)
                            }
                        </div>

                        <div className="border-2 border-gray-800 flex items-center px-2 py-3 rounded-2xl">
                            <button className={clav.nombre} onClick={() => deleteClave(clav.nombre)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    </div>


                </div>
            ))}

            {!isEditing && <button className='border-2 w-1/5 m-2 border-pink-200 py-1 rounded-xl bg-zinc-400 text-black hover:text-green-300 hover:bg-black' onClick={addClave}>Agregar clave</button>}
        </div>
    )

}