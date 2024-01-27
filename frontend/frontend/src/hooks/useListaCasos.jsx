import { useContext, useEffect } from "react"
import { CasosContext } from "../context/casoContext"
import { getMessagesByChats, updateMessagesLeidos } from "../api/auth"
import { ChatContext } from "../context/chatContext"
import { UserContext } from "../context/userContext"
import { useNavigate  } from 'react-router-dom'
export function useListaCasos ({searchCaso}){
    const navigate = useNavigate()
    const {casos} = useContext(CasosContext)
    const {setMessagesForChat, messagesForChat} = useContext(ChatContext)
    const { idUser } = useContext(UserContext)
    

    const casosChatsMapped = casos.map(caso => (
        caso.chat
    ))
    useEffect(() => {
        const getMessages = async () => {
            if(casosChatsMapped.length == 0) return 
            const rta = await getMessagesByChats(casosChatsMapped)
            if (!rta.data.ok) return 
            
            const mensajesPorChat = {};
            rta.data.messages.forEach((mensaje) => {
                const chatId = mensaje.chat;
                if (!mensajesPorChat[chatId]) {
                    mensajesPorChat[chatId] = [];
                }
                mensajesPorChat[chatId].push(mensaje);
            });
            // console.log(mensajesPorChat);
            setMessagesForChat(mensajesPorChat)
        }

        getMessages()
    }, [casos])

    const filterCasos = casos.length > 0 ? casos.filter(caso => caso?.apellido.toLowerCase().includes(searchCaso.toLowerCase())) : casos 
    
    const addCaso = () => {
        navigate('/addcase')
    }

    const isThereNoti = (idChat) => {
        const hayChat = messagesForChat.hasOwnProperty(idChat)
        if (!hayChat) return false
        const estanLeidos = messagesForChat[idChat].every(message => message.leido.includes(idUser))
        if(estanLeidos) return false
        return true
    }

    const marcarLeido = async (idChat) => {
        const messages = structuredClone(messagesForChat[idChat]) || []
        const unreadMessages = messages.filter(message => !message.leido.includes(idUser))
        if(unreadMessages.length == 0 )return
        const idsMessages = unreadMessages.map(messa => (
            messa._id
        ))
        const rta = await updateMessagesLeidos(idsMessages)
        // console.log(rta);
        unreadMessages.forEach(message => {
            const ind = messages.findIndex(mess => mess._id === message._id)
            messages[ind].leido.push(idUser)
        })
        const allMessagesReadChat = {...messagesForChat}
        allMessagesReadChat[idChat] = messages
        setMessagesForChat(allMessagesReadChat)

    }

    return { addCaso, isThereNoti, marcarLeido, filterCasos}



}