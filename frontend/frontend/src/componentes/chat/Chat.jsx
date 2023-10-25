// import { set } from "mongoose"
import { useContext, useEffect, useRef, useState } from "react"
import { formatDateToYYYYMMDD } from "../../utils/formatear.Date"

import io from 'socket.io-client'
import { UserContext } from "../../context/userContext"
import { Message } from "./Message"
import { SinImagenes } from "./SinImagenes"
import { FormularioChat } from "./FormularioChat"
import { CasosContext } from "../../context/casoContext"
import { ChatContext } from "../../context/chatContext"

const socket = io("http://127.0.0.1:3000")

export function Chat () {

    const { user, idUser } = useContext(UserContext)
    const {idCaso, casos} = useContext(CasosContext)
    const {chat, messages, setMessages, message, setMessage, 
        usersChat, setUserChat, forms, setForms, receiveMessage,
        messagesForChat, setMessagesForChat} = useContext(ChatContext)


    const informacionCasoChat = casos.filter(caso => caso._id == idCaso[0])
    const miembros = usersChat.map(user => (user.nombre)).join(', ')


    const chatContainerRef = useRef(null)
    console.log(messagesForChat);
    useEffect(() => {
        // hacerlo con axios.
        fetch(`http://127.0.0.1:3000/message?chat=${chat[0]}`)
        .then(res => res.json())
        .then((data) => {
            // console.log(data);
            if (data.ok) return setMessages(data.messages)
            if (data.messages.includes('sin mensaje')) setMessages([]);
        });
        fetch(`http://127.0.0.1:3000/chat/${chat[0]}`)
        .then(res => res.json())
        .then(data => {
            if(data.ok){
                const otherUsers = data.chat.users.filter(user => user._id != idUser)
                setUserChat(otherUsers.map(user =>( {nombre : user.nombre, id : user._id} )))
        } 
        })
    }, [chat])

    useEffect(() => {

        socket.on('message', (data) => {
            if (data.chat === chat[0]){
                receiveMessage(data)
                return
            }else{
                const idChat = data.chat
                const copyMessagesForChat = {...messagesForChat}
                if(!copyMessagesForChat[data.chat]) return 
                copyMessagesForChat[idChat].push(data)
                setMessagesForChat(copyMessagesForChat)
            }
            return
        })

        return () => {

            socket.off('message', (data) => {
                if (data.chat === chat[0]){
                    receiveMessage(data)
                    return
                }else{
                    const idChat = data.chat
                    const copyMessagesForChat = {...messagesForChat}
                    if(!copyMessagesForChat[data.chat]) return 
                    copyMessagesForChat[idChat].push(data)
                    setMessagesForChat(copyMessagesForChat)
                }
                return
            })
    
        }

    }, [])



    const changeValue = (e) => {
        setMessage(e.target.value)
    }

    const whoSent = (email) =>{
        if(!email) return true
        if(email === user.email) return true
        return false
    }
    useEffect(() => {
        // console.log(chatContainerRef);
        if(!chatContainerRef.current) return 
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [messages])

    return(
        <section className="main-chat flex flex-col px-1 gap-2 h-full" >
            <header className="header-chat flex py-3 border-2 border-gray-200 justify-around rounded-2xl">
                <button className="border-2 cursor-pointer border-pink-300 rounded-2xl p-2 bg-slate-500 hover:text-green-300 hover:bg-black" onClick={() => setForms('alarma')}>Agregar alarma</button>
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl text-pink-300">{`${chat[1]}`}</h2>
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
                        <li key={i} className={whoSent(mess?.user?.email) ? 'px-3 list-none self-end bg-green-600 rounded-xl p-1' : 'px-3 list-none self-start bg-gray-200 rounded-xl p-1'}>
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
                        chat : chat[0],
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