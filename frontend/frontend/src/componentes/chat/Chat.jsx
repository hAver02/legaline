// import { set } from "mongoose"
import { useContext, useEffect, useRef, useState } from "react"
import { formatDateToYYYYMMDD } from "../../utils/formatear.Date"

import io from 'socket.io-client'
import { UserContext } from "../../context/userContext"
import { Message } from "./Message"
import { SinImagenes } from "./SinImagenes"
import { FormularioChat } from "./FormularioChat"

import { ChatContext } from "../../context/chatContext"
import { useChat } from "../../hooks/useChat"
const socket = io("http://127.0.0.1:3000")


export function Chat ({currentChat}) {

    const { idUser } = useContext(UserContext)
    const {chat, messages, setMessages, message, setMessage, usersChat, 
        forms, setForms, receiveMessage,messagesForChat, setMessagesForChat, nombreChat} = useContext(ChatContext)
        
    const { whoSent, miembros,chatContainerRef, changeValue } = useChat({currentChat})


 
    useEffect(() => {
        socket.on('message', (data) => {
            if(data.user._id === idUser) return
            if(!messagesForChat[data.chat]) return
            if(data.chat == currentChat){
                receiveMessage(data)
                return
            }else{
                const idChat = data.chat
                const copyMessagesForChat = {...messagesForChat}
                copyMessagesForChat[idChat].push(data)
                setMessagesForChat(copyMessagesForChat)
            }
            return
        })

        return () => {

            socket.off('message', (data) => {
                if(data.user._id === idUser) return
                if(!messagesForChat[data.chat]) return
                if(data.chat == currentChat){
                    receiveMessage(data)
                    return
                }else{
                    const idChat = data.chat
                    const copyMessagesForChat = {...messagesForChat}
                    copyMessagesForChat[idChat].push(data)
                    setMessagesForChat(copyMessagesForChat)
                }
                return
            })
    
        }

    }, [])

    return(
        <section className="main-chat flex flex-col px-1 gap-2 h-full" >
            <header className="header-chat flex py-3 border-2 border-gray-200 justify-around rounded-2xl">
                <button className="border-2 cursor-pointer border-pink-300 rounded-2xl p-2 bg-slate-500 hover:text-green-300 hover:bg-black" onClick={() => setForms('alarma')}>Agregar alarma</button>
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl text-pink-300">{nombreChat}</h2>
                    <div className="items center">
                        {usersChat.length > 0 ? <p className="text-sm">{miembros} y tu</p> : <p className="text-sm">Tu</p>}
                    </div>
                </div>
                <button className="border-2 cursor-pointer border-pink-300 rounded-2xl p-2 bg-slate-500 hover:text-green-300 hover:bg-black" onClick={() => setForms('amigo')}>Agregar amigo</button>
            </header>
            {forms === '' ? 
            <section className="chat flex flex-col h-full gap-2">        
                {messages.length === 0 ? <SinImagenes /> :
                <div className="container-messages p-1" ref={chatContainerRef} >
                    <ul className="messages flex flex-col gap-1">
                        {messages.map((mess, i) => (
                        <li key={i} className={whoSent(mess?.user?.email) ? 'px-3 list-none self-end bg-green-600 rounded-xl p-1' : 'px-3 list-none self-start bg-gray-500 rounded-xl p-1'}>
                            <Message mess={mess} whoSent={whoSent}/>
                        </li>
                        ))}
                    </ul>
                </div>
                }
                <form className="mb-5 px-2 py-1 bg-pink-100 rounded-xl" onSubmit={(e) => {
                    e.preventDefault()
                    const fecha = new Date()
                    const completeMessage = {
                        user : idUser,
                        message : message,
                        chat : currentChat,
                        date : fecha,
                        leido : [idUser]
                    }
                    setMessages([...messages, completeMessage])
                    socket.emit('message', completeMessage)
                    setMessage('')
                }}>
                    <input className="w-full rounded-2xl text-center text-black border-2 focus:border-green-900" type="text" onChange={changeValue} value={message}/>
                </form>
            </section> : <FormularioChat />}
        </section>
    )
}