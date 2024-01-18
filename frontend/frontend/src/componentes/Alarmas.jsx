
import {isToday, isTomorrow} from 'date-fns'
import { formatDateToYYYYMMDD } from "../utils/formatear.Date"
import { useAlarmas } from "../hooks/useAlarmas"


export function Alarmas() { 
    const {getApellidoCaso, alarmasProximas }= useAlarmas()

    return(
        <section className="flex flex-col gap-2 mr-2 h-full">
            <div className="px-3 text-center rounded-3xl bg-pink-200 py-5">
                <h1 className="text-gray-500 text-3xl font-semibold mb-5">Legal-Line Chat</h1>
                <p className="text-black text-xl font-normal">Esta aplicación te permite centralizar casos legales, chats y cálculos.</p>
                <p className="text-black text-xl font-normal">Te simplifica la colaboración entre colegas abogados y optimiza tu práctica legal.</p>
            </div>
            <div className="body-alarmas h-full flex flex-col gap-4 items-center px-2">
                <h2 className="text-gray-400 text-3xl font-semibold mt-2">VENCIMIENTOS PROXIMOS DE ALARMAS</h2>
                <div className="container-alarmas flex flex-col gap-2 w-full">
                    {alarmasProximas.map(alarm => (
                        <div key={alarm._id} className="flex justify-around items-center border-2 border-pink-200 rounded-3xl ">
                            <div className="flex flex-col">
                                <label>Titulo: </label>
                                <p>{alarm.mensaje}</p>
                            </div>
                            <div className="alarma-item alarmas-caso"> 
                                <label>Caso:</label>
                                <p>{getApellidoCaso(alarm._id)}</p>
                            </div>
                            <div 
                                className={isToday(new Date(alarm.vencimiento)) || isTomorrow(new Date(alarm.vencimiento)) ? "alarma-item alarmas-vencimiento-pronto" : "alarma-item"}
                            >
                                <label>Vencimiento:</label>
                                <p>{formatDateToYYYYMMDD(alarm.vencimiento)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}