
import {createContext, useState, useEffect, useContext} from 'react'
// import {useNavigate} from 'react-router-dom'
export const UserContext = createContext()


export function UserProvider({children}){

    const [idUser, setIdUser ] = useState('')
    const [isLoading, setIsLoading ] = useState(true)
    const [user, setUser] = useState({})
    const [pageAlarmas, setPageAlarmas] = useState(true) 
    // const [chat, setChat] = useState([])
    const [isAuth, setIsAuth] = useState(false)
    const [refresh, setRefresh] = useState(false)
    
    return (
        <UserContext.Provider value={{user, setUser, pageAlarmas, setPageAlarmas,setIdUser, 
                                        idUser, isAuth, setIsAuth, isLoading, setIsLoading, refresh, setRefresh, 
                                    }}>
            { children }    
        </UserContext.Provider>
    )
}


