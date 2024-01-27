import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../context/chatContext";
import { UserContext } from "../context/userContext";


export function useChat({currentChat}){
    const { usersChat, setMessages, setUserChat, setMessage, messages, messagesForChat} = useContext(ChatContext)
    const { user, idUser } = useContext(UserContext)
    const miembros = usersChat.map(user => (user.nombre)).join(', ')
    

    const chatContainerRef = useRef(null)
    useEffect(() => {
        if(!currentChat) return 
        const messags = messagesForChat[currentChat]
        if(!messags){
            setMessages([])
        }else{
            setMessages(messags)
        }
        fetch(`http://127.0.0.1:3000/chat/${currentChat}`)
        .then(res => res.json())
        .then(data => {
            if(data.ok){
                // console.log(data);
                const otherUsers = data.chat.users.filter(user => user._id != idUser)
                setUserChat(otherUsers.map(user =>( {nombre : user.nombre, id : user._id} )))
        } 
        })
    }, [currentChat])


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
    const changeValue = (e) => {
        setMessage(e.target.value)
    }
    return {
        whoSent, miembros,chatContainerRef, changeValue
    }
}