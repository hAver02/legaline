import { createContext, useState } from "react";


export const CasosContext = createContext()

export function CasosProvider ({ children }) {
    const [casos, setCasos] = useState([])
    const [infoCaso, setInfoCaso] = useState('')
    const [idCaso, setIdCaso] = useState([])
    
    const [datosCaso, setDatosCaso] = useState({})
    const [isEditing, setIsEditing] = useState(false)

    return (
        <CasosContext.Provider value={{casos, setCasos, infoCaso, setInfoCaso, idCaso, setIdCaso,
            datosCaso, setDatosCaso, isEditing, setIsEditing
        }}>
            {children}
        </CasosContext.Provider>
    )
}