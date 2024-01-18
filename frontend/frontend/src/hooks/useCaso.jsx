import { useContext, useEffect } from "react"
import { CasosContext } from "../context/casoContext"
import { getCase, updatedCaso } from "../api/auth"
import { formatDateToYYYYMMDD, isValidDateFormat } from "../utils/formatear.Date"

export function useCaso(caso) {
    const { datosCaso, setDatosCaso, setIsEditing, isEditing} = useContext(CasosContext)
    useEffect(() => {
      const getInfoCase = async () => {
        const rta = await getCase(caso)
        if(rta.data.ok) return setDatosCaso({...rta.data.caso, fechaNac : formatDateToYYYYMMDD(rta.data.caso.fechaNac)})
      }
      getInfoCase()
    }, [caso])
    
    const handleEditing = () => {
      setIsEditing(!isEditing)
    }
      const handleEditUser = async (newCaso) => {
        const updated = await updatedCaso(newCaso, caso)
        setDatosCaso(newCaso)
      };
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        if(name == 'fechaNac'){
          if(isValidDateFormat(value)){
            // setFormErrorPersonal(false)
            setDatosCaso({ ...datosCaso, [name]: value });
          }
          else{
            setDatosCaso({ ...datosCaso, [name]: value });
            setFormErrorPersonal(true)
          }
        }
        else if(name == "recoAnses" || name === "recoIPS"){
          if(e.target.checked){
            setDatosCaso({...datosCaso, [name] : true})
          }else{
            setDatosCaso({...datosCaso, [name] : false})
          }
          return
        }
        else{
    
          setDatosCaso({ ...datosCaso, [name]: value });
        }
      };
      const handleEditButtonClick = (e) => {
        e.preventDefault()
        setIsEditing(true);
      };
      const handleSaveButtonClick = (e) => {
        e.preventDefault()
          setIsEditing(false);
          handleEditUser(datosCaso);
      
      };
      const addClave = () => {
        let numeroRandom = Math.floor(Math.random() * 100) + 1;
        numeroRandom = numeroRandom.toString()
        claves.push( {nombre : numeroRandom , contraseña : 'Ingresar contraseña' } )
        const newCaso = {... datosCaso, claves : claves}
        setDatosCaso(newCaso)
        handleEditUser(newCaso)
      }
    const claves = datosCaso?.claves || []
    return { claves, addClave, handleEditButtonClick, handleSaveButtonClick, handleInputChange, handleEditUser, isEditing, handleEditing }
}