import { useContext } from "react"
import { UserContext } from "../context/userContext"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { validateToken } from "../api/auth"
import Cookies from 'js-cookie' 



export function IsAuth() {
    const { isAuth, isLoading, idUser, setIdUser} = useContext(UserContext)
    if(!isAuth && !isLoading) return <Navigate to={'/login'} replace/>
    // console.log(idUser);
    return <Outlet />
}





export function IsThereToken () {
    // console.log('hola');
    const {isAuth, setIsAuth} = useContext(UserContext)
    const navigate = useNavigate()

    async function checkToken (){
        // if(isAuth) return <Navigate to={'/'} replace/>
        const cookies = Cookies.get()
        if(cookies?.token){
            const res = await validateToken(cookies.token)
            // console.log(res);
            if (res.data.ok) {
                setIsAuth(true)
                setIdUser(res.data.id)
                navigate('/')
            }
        }
    }
    checkToken()
    return <Outlet />
}