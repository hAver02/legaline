
import { useContext, useEffect, useState } from "react";
import { formatDateToYYYYMMDD, isValidDateFormat } from '../../utils/formatear.Date'
import { InfoPersonal } from "./InfoPersonal";
import { InfoTrabajo } from "./InfoTrabajo"
import { InfoReco } from "./infoReco";
import { InfoClaves } from "./infoClaves";
import { UserContext } from "../../context/userContext";
import { getCase, updatedCaso } from "../../api/auth";
import { CasosContext } from "../../context/casoContext";


export function InfoCaso ({caso}) {

  const { idUser } = useContext(UserContext)
  const { datosCaso, setDatosCaso, isEditing, setIsEditing} = useContext(CasosContext)
  useEffect(() => {
    const getInfoCase = async () => {
      const rta = await getCase(caso)
      if(rta.data.ok) return setDatosCaso({...rta.data.caso, fechaNac : formatDateToYYYYMMDD(rta.data.caso.fechaNac)})
    }
    getInfoCase()
  }, [caso])


    const handleEditUser = async (newCaso) => {
      console.log(newCaso);
      const updated = await updatedCaso(newCaso, caso)
      console.log(updated);
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

    return (
      <section className="flex flex-col h-full gap-3 mr-5">
          
          <InfoPersonal handleInputChange={handleInputChange}/>
          
          <InfoReco handleInputChange={handleInputChange} />

          <InfoTrabajo handleInputChange={handleInputChange} handleEditUser = {handleEditUser} />

          {claves.length === 0 ? 
            !isEditing && <button onClick={addClave} className='border-2 w-1/5 mx-3 my-2 border-pink-200 py-1 px-3 rounded-xl bg-zinc-400 text-black hover:text-green-300 hover:bg-black'>Agregar clave</button>
            : <InfoClaves claves={claves} addClave={addClave} handleEditUser={handleEditUser}/>}
            
          
          <div className="mx-3 pb-5">
              {isEditing 
                ? ( <div className="flex justify-around">
                      <button 
                        className='border-2 w-1/5 border-pink-200 py-1 px-3 rounded-xl bg-zinc-400 text-black hover:text-green-300 hover:bg-black' 
                        onClick={handleSaveButtonClick}>
                        Guardar 
                      </button> 
                      <button className="border-2 w-1/5 px-3 py-1 rounded-2xl bg-red-400 text-black hover:bg-red-500" onClick={() => {
                        setIsEditing(false)
                      }}>
                        Cancelar
                      </button>
                  </div>)
                : (<button onClick={handleEditButtonClick} className='border-2 w-1/5 border-pink-200 py-1 px-3 rounded-xl bg-zinc-400 text-black hover:text-green-300 hover:bg-black'> 
                    Modificar usuario
                  </button> )
              }
          </div>
        
      </section>
    );
  };
