
import { getHours, getMinutes } from 'date-fns'
export function Message ({ mess, whoSent }) {
    
    function getHora(fecha) {
        const hora = getHours(new Date(fecha))
        const minutos = getMinutes(new Date(fecha))
        if(minutos < 10) return `${hora}:0${minutos}`
        return `${hora}:${minutos}`
    }

    // console.log(mess);
    return ( 
            <div className="flex flex-col ml-5 items-end">
                <div >
                    {!whoSent(mess?.user?.email) && <h5 className="text-sm text-gray-400">{mess?.user?.nombre}</h5> }
                    {/* <h6>{formatDateToYYYYMMDD(mess?.date)}</h6> */}
                </div>
                <p>{mess.message}</p>
                <small className='text-end'>{getHora(mess?.date)}</small>
            </div>

)}