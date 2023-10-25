import { useContext } from "react"
import { CasosContext } from "../../context/casoContext"


export function InfoPersonal ( { handleInputChange } ) {
    // console.log(datosCaso);
    const { datosCaso, isEditing} = useContext(CasosContext)
    return (
        <form className="form-personal flex flex-wrap gap-5 w-full rounded-2xl justify-between items-center py-1 px-5">
            <div className="flex flex-col items-start gap-2">
              <label className="font-bold font-sans text-xl text-white">Nombre:</label>
              {isEditing 
              ? ( <input className="text-black text-base rounded-xl border-2 border-pink-300" type="text" name="nombre" value={datosCaso.nombre} required onChange={handleInputChange} />) 
              : ( <span className="text-base">{datosCaso.nombre}</span> )
              }
            </div>

            <div className= "flex flex-col items-start gap-2">
              <label className="font-bold font-sans text-xl text-white">Apellido:</label>
              {isEditing 
              ? ( <input className="text-black text-base rounded-xl border-2 border-pink-300" type="text" name="apellido" value={datosCaso.apellido} required onChange={handleInputChange}/>) 
              : ( <span className="text-base">{datosCaso.apellido}</span>)
              }
            </div>

            <div className= "flex flex-col items-start gap-2">
              <label className="font-bold font-sans text-xl text-white">Fecha de Nacimiento:</label>
              {isEditing 
              ? ( <input className="text-black text-base rounded-xl border-2 border-pink-300" type="date" name="fechaNac" value={datosCaso.fechaNac} required onChange={handleInputChange} /> ) 
              : ( <span className="text-base">{datosCaso.fechaNac}</span>)
              }
            </div>

            <div className="flex flex-col items-start gap-2">
              <label className="font-bold font-sans text-xl text-white">DNI:</label>
              {isEditing 
              ? ( <input className="text-black text-base rounded-xl border-2 border-pink-300" type="number" name="documento" value={datosCaso?.documento} required onChange={handleInputChange} />) 
              : ( <span className="text-base">{datosCaso.documento}</span>)
              }
            </div>
            <div className="flex flex-col items-start gap-2">
              <label className="font-bold font-sans text-xl text-white">CUIL:</label>
              {isEditing 
              ? ( <input className="text-black text-base rounded-xl border-2 border-pink-300" type="text" name="cuil" value={datosCaso?.cuil} required onChange={handleInputChange} />) 
              : ( <span className="text-base">{datosCaso.cuil}</span>)
              }
            </div>
  
        </form>        
    )
}