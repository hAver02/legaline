import { useContext, useState } from "react"
import { CasosContext } from "../../context/casoContext"


export function InfoReco ({ handleInputChange }) {
    const {datosCaso, isEditing, setDatosCaso} = useContext(CasosContext)

    const changeJubilacion = (e) => {
        setDatosCaso({...datosCaso, tipoJubilacion : e.target.value})
    }
    return (
        <div className="info-reco w-full flex flex-wrap items-center py-4 px-5 gap-10 my-2 rounded-3xl">
                <div className="reco-item">
                    <label className="font-bold text-base text-white">RECONOCIMIENTO ANSES: </label>
                    {isEditing ? 
                    <input className="text-base border-2 border-gray-900 px-2 py-1 " type="checkbox" name="recoAnses" checked={datosCaso.recoAnses} onChange={handleInputChange} />
                    : <span className="px-2 text-base">{datosCaso.recoAnses ? "SI" : "NO"}</span>
                    }
                </div>
                <div className="reco-item">
                    <label className="font-bold text-base text-white">RECONOCIMIENTO IPS: </label>
                    {isEditing ? 
                    <input className="text-base border-2 border-gray-900 px-2 py-1 " type="checkbox" name="recoIPS" checked={datosCaso.recoIPS} onChange={handleInputChange} />
                    : <span className="px-2 text-base">{datosCaso.recoIPS ? 'SI' : "NO"}</span>
                    }
                </div>
                <div className="reco-item">
                    <label className="font-bold text-base text-white">Jubilacion: </label>
                    {isEditing ? 
                    <select className="text-black px-2 py-1 rounded-md" name="tipoJubilacion" value={datosCaso.tipoJubilacion} onChange={changeJubilacion}>
                        <option value="DOCENTE IPS">DOCENTE IPS</option>
                        <option value="OTRA">OTRA</option>
                        <option value="IPS">IPS</option>
                        <option value="ANSES">ANSES</option>
                        <option value="MIXTA IPS-ANSES">MIXTA IPS-ANSES</option>
                        <option value="MIXTA ANSES-IPS">MIXTA ANSES-IPS</option>
                    </select> 
                    :
                    <span className="px-2 text-base">{datosCaso.tipoJubilacion}</span>
                    }
                </div>
       </div>
    )
}