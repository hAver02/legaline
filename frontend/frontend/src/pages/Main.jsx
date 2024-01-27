
import { Chat } from '../componentes/chat/Chat'
import { ListaDeCasos } from '../componentes/ListaDeCasos'
import { Alarmas } from '../componentes/Alarmas'
// import { Header } from '../componentes/header/Header'
import  { InfoCaso } from '../componentes/infocasos/InfoCaso'
// import { AddCase } from '../componentes/AddCase'


import { useContext, useState } from 'react'
import { UserContext } from '../context/userContext'

import { CasosContext } from '../context/casoContext'
import { useAuthValidation } from '../hooks/useAuthValidation'


export function Main () {
    const { pageAlarmas }  = useContext(UserContext)
    const {infoCaso} = useContext(CasosContext)
    const [currentChat, setCurrentChat] = useState('')
    useAuthValidation()
    
    return (
      <div className='flex flex-col h-[85vh]'>
        <section className='main flex justify-between gap-3 h-full'>
            <ListaDeCasos setCurrentChat={setCurrentChat}/>
            <div className='section-derecha flex-2 items-center h-full overflow-y-auto pt-5'>
                {infoCaso && <InfoCaso caso={infoCaso} /> || (pageAlarmas ? <Alarmas /> : <Chat currentChat={currentChat}/>) }
            </div>
        </section>
      </div>
  )
}