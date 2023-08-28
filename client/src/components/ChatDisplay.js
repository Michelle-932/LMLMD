import Chat from './Chat'
import ChatInput from './ChatInput'
import axios from 'axios'
import {useState, useEffect} from 'react'

const ChatDisplay = ({ user , clickedUser }) => {
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id
    const [usersMessages, setUsersMessages] = useState(null)
    const [clickedUsersMessages, setClickedUsersMessages] = useState(null)

    const getUsersMessages = async () => {
     try {
            const response = await axios.get('https://lmlmd-aaf8048793e5.herokuapp.com/messages', {
                params: { userId: userId, correspondingUserId: clickedUserId}
            })
         setUsersMessages(response.data)
        } catch (error) {
         console.log(error)
     }
    }

    const getClickedUsersMessages = async () => {
        try {
            const response = await axios.get('https://lmlmd-aaf8048793e5.herokuapp.com/messages', {
                params: { userId: clickedUserId , correspondingUserId: userId}
            })
            setClickedUsersMessages(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    //empty array stops this from running endlessly
    useEffect(() => {
        getUsersMessages()
        getClickedUsersMessages()
    }, [])

    const messages = []

    //this function is what formats the message
    usersMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = user?.first_name
        formattedMessage['img'] = user?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })

    clickedUsersMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = clickedUser?.first_name
        formattedMessage['img'] = clickedUser?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })

    //sort messages by date & time
    const descendingOrderMessages = messages?.sort((a,b) => a.timestamp.localeCompare(b.timestamp))

    return (
        <>
        <div className="chat-and-input">
            <Chat descendingOrderMessages = {descendingOrderMessages}/>
            <ChatInput
                user={user}
                clickedUser={clickedUser}
                getUsersMessages={getUsersMessages}
                getClickedUsersMessages={getClickedUsersMessages} 
            />
        </div>
        </>
    )
}

export default ChatDisplay