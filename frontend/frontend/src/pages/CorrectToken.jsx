import { Outlet, useNavigate, useParams } from "react-router-dom"
import { validateToken } from "../api/auth"



export function CorrectToken(){

    const navigate = useNavigate()
    const currentURL = new URL(window.location.href)
    const queryParams = new URLSearchParams(currentURL.search)
    const token = queryParams.get('token')
    // console.log(toke);


    const validate = async () => {
        // console.log(toke);
        const rta = await validateToken(token)
        console.log(rta);
        // if(!rta.ok) return navigate('/')
    }
    validate()

    return <Outlet />
}