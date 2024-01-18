import { useContext, useState } from "react"
import { CasosContext } from "../context/casoContext"
import { getDate, getDaysInMonth, parseISO } from "date-fns"


export function useCasoTrabajo(handleEditUser){
    const { datosCaso, isEditing, setDatosCaso }  = useContext(CasosContext)

    const periodoTrabajo = datosCaso.periodosTrabajados || []
    const [addWork, setAddWork] = useState(false)
    const [newWork, setNewWork] = useState({})
    const [actualidadNewWork, setActualidadNewWork] = useState(false)

    const handleInputChangeTrabajo = (e) => {
        const { name, value } = e.target
        e.preventDefault()
        const index = periodoTrabajo.findIndex(perio => perio.lugar === e.target.className)
        if(name === "hasta" || name === "desde"){
            name == 'hasta' ? periodoTrabajo[index].hasta = value : periodoTrabajo[index].desde = value
            setDatosCaso({ ...datosCaso, periodosTrabajados : periodoTrabajo});
        }else{
            // Modificamos unicamente el lugar.
            periodoTrabajo[index].lugar = value
            setDatosCaso( {...datosCaso, periodosTrabajados : periodoTrabajo} )
        }
    }
    const handleAddWork = (e) => {
        e.preventDefault()
        setAddWork(!addWork)
    } 
    const changeNewWork = (e) => {
        const {value, name} = e.target
        if(name == 'actualidad'){
            setActualidadNewWork(e.target.checked)
            if (e.target.checked) setNewWork( { ...newWork, hasta : null } )
            return
        }
        setNewWork( { ...newWork, [name] : value } )
    }
    const addWorkToCase = (e) => {
        e.preventDefault()
        if((newWork?.desde && newWork?.lugar) && (newWork?.hasta == null || newWork?.hasta)){
            periodoTrabajo.push(newWork)
            setDatosCaso({...datosCaso, periodosTrabajados : periodoTrabajo})
            setAddWork(false)
            setActualidadNewWork(false)
            handleEditUser(datosCaso)
        }

    }
    const eliminarTrabajo = (lugar) =>{
        const ind = periodoTrabajo.findIndex(tra => tra.lugar === lugar)
        if (ind == -1) return //error al no poder eliminar
        periodoTrabajo.splice(ind,1)
        // const copiaInfoCaso = structuredClone(datosCaso)

        setDatosCaso({...datosCaso, periodosTrabajados : periodoTrabajo})
        handleEditUser(datosCaso)


    }
    const cantDays = (fechaDesde, fechaHasta) => {
        // console.log(fechaHasta, fechaDesde);
        const fechaDesdeParsed = parseISO(fechaDesde)
        const fechaHastaParsed = parseISO(fechaHasta) 

        const desdeDay = getDate(fechaDesdeParsed)
        const hastaDay = getDate(fechaHastaParsed)

        if (hastaDay === desdeDay) return 0
        if (hastaDay > desdeDay) {
            return hastaDay - desdeDay
        }else{
            const days = getDaysInMonth(desdeDay) == hastaDay ? hastaDay : getDaysInMonth(desdeDay) - desdeDay + hastaDay
            return days
        }
    }


    return {
        periodoTrabajo ,isEditing, actualidadNewWork, handleInputChangeTrabajo, handleAddWork, 
        changeNewWork,addWorkToCase, eliminarTrabajo, cantDays, addWork, newWork
    }
}