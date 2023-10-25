import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/userContext"
import { getMessagesByChats, updateMessagesLeidos } from "../api/auth"
import { CasosContext } from "../context/casoContext"
import { ChatContext } from "../context/chatContext"
import { useNavigate } from "react-router-dom"

export function ListaDeCasos ({ setPageAddCaso }) {
    const navigate = useNavigate()
    const { setPageAlarmas, idUser } = useContext(UserContext)
    const {casos, setInfoCaso, setIdCaso} = useContext(CasosContext)
    const { setChat, messagesForChat, setMessagesForChat } = useContext(ChatContext)

    const [ searchCaso, setSearchCaso ] = useState('')

    const casosChatsMapped = casos.map(caso => (
        caso.chat
        ))



    useEffect(() => {
        const getMessages = async () => {
            if(casosChatsMapped.length == 0) return 
            const rta = await getMessagesByChats(casosChatsMapped)
            // console.log(rta);
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
        if (!hayChat) return true
        const estanLeidos = messagesForChat[idChat].every(message => message.leido.includes(idUser))
        if(estanLeidos) return true
        return false
    }
    // console.log(messagesForChat);

    const marcarLeido = async (idChat) => {
        const messages = structuredClone(messagesForChat[idChat]) || []
        const unreadMessages = messages.filter(message => !message.leido.includes(idUser))
        
        if(unreadMessages.length == 0 )return

        const idsMessages = unreadMessages.map(messa => (
            messa._id
        ))
        const rta = await updateMessagesLeidos(idsMessages)
        console.log(rta);
        unreadMessages.forEach(message => {
            const ind = messages.findIndex(mess => mess._id === message._id)
            messages[ind].leido.push(idUser)
        })
        const allMessagesReadChat = {...messagesForChat}
        allMessagesReadChat[idChat] = messages
        setMessagesForChat(allMessagesReadChat)

    }

    // console.log(filterCasos);
    return(
        <aside className="flex flex-col gap-5 justify-start px-5 flex-1 min-h-[85vh] h-full pt-5">
            <div className="flex flex-col gap-2">
                {/* <h3 className="text-center text-3xl text-pink-200 font-bold">Casos</h3> */}
                <div className="flex flex-col items-center justify-between py-6 rounded-xl border-2 border-green-300 gap-3">
                    <input className=" border-2 border-pink-200 text-black rounded-xl w-1/2 py-1 px-2" type='text' placeholder="Busque un caso" onChange={(e) => setSearchCaso(e.target.value)}/>   
                    <button onClick={addCaso} className="border-2 border-pink-200 py-1 px-3 rounded-xl bg-zinc-400 text-black hover:text-green-300 hover:bg-black ">Crear caso</button>
                </div>   
            </div>
            <div className="h-full overflow-y-auto">
                {/* VER SI HAY CASOS. */}
                <ul className="flex flex-col gap-1 list-none">
                    {filterCasos.map(caso => (
                        <li key={caso?.apellido} className="lista-casos flex items-center py-2 justify-around w-full border-2 cursor-pointer border-green-300 rounded-2xl hover:bg-gray-900">
                            <span className={caso?.chat} onClick={(e) => {
                                setPageAlarmas(false)
                                setChat([e.target.className, e.target.textContent,])
                                setInfoCaso("")
                                setIdCaso([caso._id, caso.apellido])
                                marcarLeido(caso?.chat)
                            }}>
                                {caso.apellido}
                            </span>
                            <div className="flex items-center gap-2">

                                {!isThereNoti(caso.chat) && <span className="h-4 w-4 rounded-full bg-green-400"></span>}
                                <button onClick={() => setInfoCaso(caso._id)} className='p-2 bg-gray-700 rounded-full'>
                                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    )
                    )}
                </ul>
            </div>
        </aside>
    )
}


