import { createContext, useEffect, useState } from "react";

export const ChatContext = createContext()




export function ChatProvider({children}){
    
    const [nombreChat, setNombreChat] = useState('')
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [usersChat, setUserChat ] = useState([])
    const [forms, setForms] = useState('')
    const [messagesForChat, setMessagesForChat] = useState({})

    const receiveMessage = mess => {
        setMessages(state => [...state, mess])
    }
    

    return(
        <ChatContext.Provider value={{ messages, setMessages, message, 
            setMessage, usersChat, setUserChat, forms, setForms, receiveMessage,
            messagesForChat, setMessagesForChat,nombreChat, setNombreChat
        }}>
            {children}
        </ChatContext.Provider>
    )
}
