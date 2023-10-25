import { createContext, useState } from "react";

export const ChatContext = createContext()




export function ChatProvider({children}){
    
    const [chat, setChat] = useState([])
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [usersChat, setUserChat ] = useState([])
    const [forms, setForms] = useState('')
    const [messagesForChat, setMessagesForChat] = useState({})

    const receiveMessage = mess => {
        setMessages(state => [...state, mess])
    }
    
    return(
        <ChatContext.Provider value={{chat, setChat, messages, setMessages, message, 
            setMessage, usersChat, setUserChat, forms, setForms, receiveMessage,
            messagesForChat, setMessagesForChat
        }}>
            {children}
        </ChatContext.Provider>
    )
}
