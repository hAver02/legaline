import { useContext } from "react"
import { UserContext } from "../context/userContext"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { validateToken } from "../api/auth"
import Cookies from 'js-cookie' 



export function IsAuth() {
    const { isAuth, isLoading} = useContext(UserContext)
    // console.log(isAuth, isLoading);
    if(!isAuth && !isLoading) return <Navigate to={'/login'} replace/>
    // console.log('hola');
    return <Outlet />
}





export function IsThereToken () {
    const {isAuth, setIsAuth} = useContext(UserContext)
    const navigate = useNavigate()
    // console.log(isAuth);
    async function checkToken (){
        if(isAuth) return <Navigate to={'/'} replace/>

        const cookies = Cookies.get()
        // console.log(cookies);
        if(cookies?.token){
            const res = await validateToken(cookies.token)
            // console.log(res);
            if (res.data.ok) {
                setIsAuth(true)
                navigate('/')
            }
        }
    }
    checkToken()
    return <Outlet />
}