
import { Chat } from '../componentes/chat/Chat'
import { ListaDeCasos } from '../componentes/ListaDeCasos'
import { Alarmas } from '../componentes/Alarmas'
import { Header } from '../componentes/header/Header'
import  { InfoCaso } from '../componentes/infocasos/InfoCaso'
import { AddCase } from '../componentes/AddCase'


import Cookies from 'js-cookie'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/userContext'
import { validateToken } from '../api/auth'
import { CasosContext } from '../context/casoContext'


export function Main () {
    
    const { setIsLoading,setIdUser,setUser,pageAlarmas, chat,  
    refresh, setRefresh, idUser, isAuth, setIsAuth }  = useContext(UserContext)

    const {infoCaso, setCasos} = useContext(CasosContext)

    useEffect(() => {
        if(idUser == "") return 
        fetch(`http://127.0.0.1:3000/user/${idUser}`)
        .then(res => res.json())
        .then(data => {
            if(!data.ok) return // Mostrar algun tipo de error.
            // console.log(data);
            setUser(data.user)
            setCasos(data.user.casos)
            if(refresh) setRefresh(false)
        })
        .catch(err => console.log(err))
    }, [idUser, refresh])   

    useEffect(() => {
        async function checkToken (){

            if(isAuth && idUser) return setIsLoading(false)
            setIsLoading(true)
            const cookies = Cookies.get()
            if(cookies?.token){
                const res = await validateToken(cookies.token)
                // console.log(res);
                if (res.data.ok) {
                    setIdUser(res.data.id)
                    setIsAuth(true)
                }
            } 
            setIsLoading(false)
        }

        checkToken()

    },[refresh])




    return (
      <div className='flex flex-col h-[85vh]'>
        <section className='main flex justify-between gap-3 h-full'>
            <ListaDeCasos />
            <div className='section-derecha flex-2 items-center h-full overflow-y-auto pt-5'>
                {infoCaso && <InfoCaso caso={infoCaso} /> || (pageAlarmas ? <Alarmas /> : <Chat />) }
            </div>
        </section>
      </div>
  )
}