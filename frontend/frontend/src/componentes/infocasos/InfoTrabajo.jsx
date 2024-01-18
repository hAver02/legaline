
import { formatDateToYYYYMMDD} from '../../utils/formatear.Date'
import { differenceInYears, differenceInMonths} from 'date-fns'

import { useCasoTrabajo } from '../../hooks/useCasoTrabajo'

export function InfoTrabajo({ handleEditUser }) {
    // console.log(datosCaso);
    const {periodoTrabajo ,isEditing, actualidadNewWork, handleInputChangeTrabajo, handleAddWork,
         changeNewWork,addWorkToCase, eliminarTrabajo, cantDays, addWork, newWork} = useCasoTrabajo(handleEditUser)

    return (
        <form className='form-trabajo w-full flex flex-col gap-2 px-2'>  
            {/* VALIDAR QUE HAYA TRABAJOS */}
            <div>
                <h3 className='text-center text-xl font-bold text-pink-300'>PERIODOS DE TRABAJO</h3>
            </div>
            {periodoTrabajo.map((periodo, i)=> (
                <div className='flex justify-between items-center gap-2 border-2 border-gray-800 rounded-2xl px-3 py-2' key={i}>
                        <div className='trabajos-items flex flex-col items-start justify-start gap-1'>
                        <label className='font-bold text-xl'>Lugar: </label>
                            { isEditing 
                                ? (<input type="text" name="lugar" value={periodo.lugar} className={periodo.lugar} onChange={handleInputChangeTrabajo}/>)
                                : (<span className='text-base'>{periodo?.lugar}</span>)                        
                            }
                        </div>

                        <div className='trabajos-items flex flex-col items-start justify-start gap-1'>
                            <label className='font-bold text-xl'>Desde: </label>
                            { isEditing 
                                ? (<input 
                                        type="date" 
                                        name="desde"
                                        value={formatDateToYYYYMMDD(periodo.desde)} 
                                        className={periodo.lugar} 
                                        onChange={handleInputChangeTrabajo}
                                    />)
                                : (<span className='text-base'>{formatDateToYYYYMMDD(periodo?.desde)}</span>)                        
                            }
                        </div>

                        <div className='trabajos-items flex flex-col items-start justify-start gap-1'>
                            <label className='font-bold text-xl'>Hasta: </label>
                            { isEditing 
                                ?
                                (<input 
                                        type="date" 
                                        name="hasta" 
                                        value={formatDateToYYYYMMDD(periodo.hasta)} 
                                        className={periodo.lugar}  
                                        onChange={handleInputChangeTrabajo}
                                    />)
                                : (<span className='text-base'>{periodo.hasta ? formatDateToYYYYMMDD(periodo?.hasta) : 'ACTUALIDAD'}</span>)                        
                            }
                        </div>
                        
                         {!isEditing &&
                        <div>
                            <p>
                                {periodo.hasta == null ? differenceInYears(new Date(), new Date(formatDateToYYYYMMDD(periodo.desde))) :
                                    differenceInYears(new Date(formatDateToYYYYMMDD(periodo.hasta)), 
                                    new Date(formatDateToYYYYMMDD(periodo?.desde))) 
                                } Años
                            </p>
                            <p>
                                {periodo.hasta == null ?  
                                    differenceInMonths(new Date(), new Date(formatDateToYYYYMMDD(periodo.desde))) % 12 :
                                    differenceInMonths(new Date(formatDateToYYYYMMDD(periodo.hasta)), 
                                    new Date(formatDateToYYYYMMDD(periodo?.desde))) % 12      
                                } Meses
                            </p>
                            <p>
                                {periodo.hasta == null ?  
                                    cantDays(formatDateToYYYYMMDD(periodo.desde), formatDateToYYYYMMDD(new Date())) :
                                    cantDays(formatDateToYYYYMMDD(periodo.desde), formatDateToYYYYMMDD(periodo?.hasta))
                                } Dias
                            </p>
                        </div>    
                        }   
                        <div 
                        className='border-2 border-gray-800 flex items-center px-2 py-3 rounded-2xl' 
                        onClick={(e) => {
                            e.preventDefault()
                            eliminarTrabajo(periodo.lugar)
                        }}>
                            <button className={periodo.lugar} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </div>

                </div>
                ))}         
            
            {(!addWork && !isEditing) && <button className='border-2 mx-1 w-1/5 mt-3 border-pink-200 py-1 px-3 rounded-xl  bg-zinc-400 text-black hover:text-green-300 hover:bg-black' onClick={handleAddWork}>Agregar trabajo</button>}

            {addWork && 
            <div className='flex flex-col gap-5 mt-3'>
                <div className='flex flex-wrap gap-2 justify-between m-2'>
                    <div className='flex flex-col gap-2 items-start'>
                        <label className='text-xl font-bold'>Lugar: </label>
                        <input className='p-1 text-black rounded-xl' type="text" name='lugar' value={newWork.lugar} onChange={changeNewWork} />
                    </div>
                    <div className='flex flex-col gap-2 items-start'>
                        <label className='text-xl font-bold'>Desde: </label>
                        <input className='p-1 text-black rounded-xl' type="date" name='desde' value={newWork.desde} onChange={changeNewWork} />
                    </div>
                    {!actualidadNewWork &&<div className='flex flex-col gap-2 items-start'>
                        <label className='text-xl font-bold'>Hasta: </label>
                        <input className='p-1 text-black rounded-xl' type="date" name='hasta' value={newWork.hasta} onChange={changeNewWork} />
                    </div>}
                    <div className='flex flex-col gap-2 items-startß'>
                        <label className='text-xl font-bold'>Actualidad</label>
                        <input className='p-1 text-black rounded-xl 'type="checkbox" name='actualidad' onChange={changeNewWork}/>
                    </div>  
                </div>
                <div className='flex justify-around m-2'>
                        <button className=' w-1/5 py-1 rounded-2xl bg-red-400 text-black hover:bg-red-500' onClick={() => {
                            setActualidadNewWork(false)
                            setAddWork(false)
                            setNewWork({})
                        }}>Cancelar</button>
                        <button onClick={addWorkToCase} className='border-2 w-1/5 self-end border-pink-300  py-1 rounded-2xl mr-5 bg-gray-500 hover:bg-black hover:text-green-300'> 
                            Agregar
                        </button>
                </div>  
            </div>
            }

         </form>
        
    )
}