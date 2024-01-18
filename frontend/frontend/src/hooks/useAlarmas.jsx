import { useContext, useEffect, useMemo, useState } from "react"
import { CasosContext } from "../context/casoContext"
import { getNotisById } from "../api/auth"
import { isPast } from "date-fns"


export function useAlarmas (){
    const { casos } = useContext(CasosContext)
    const arrayCasosyAlarmas = casos.map(caso => ( {idAlarma : caso.alarmas, caso : caso.apellido} ) || [])
    const arrayCasos = arrayCasosyAlarmas.map(casoyAlarma => ( casoyAlarma.idAlarma))
    const idsCasos = [...arrayCasos.flat()]
    const [alarmas, setAlarmas] = useState([])

    function getApellidoCaso(id){
        const index = arrayCasosyAlarmas.findIndex(con => con.idAlarma.includes(id))
        return arrayCasosyAlarmas[index]?.caso
    }

    useEffect(() => {
        async function getNotis (){
            if(casos.length == 0 || idsCasos.length == 0) return
                try {
                    const rta = await getNotisById(idsCasos)
                    if(rta.data.ok){
                        setAlarmas(rta.data.notificaciones)        
                    }
                } catch (error) {
                    
                }
        }
        getNotis()
    }, [casos])

    const alarmasProximas = useMemo(() => {
        return alarmas.filter(alarm => !isPast(new Date(alarm.vencimiento)))
    },[alarmas])


    return {getApellidoCaso, alarmasProximas}
}