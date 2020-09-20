import React, { FC, useEffect, useState } from 'react'
import './MessageItem.css'

interface MessageItemProps {
    data: {
        body: string
        date: number
        author: string
    },
    user: {
        id: string
        name: string
        avatar: string
    }
}


const MessageItem: FC<MessageItemProps> = ({ data, user }) => {

    const [time, setTime] = useState('')


    return (
        <div className="messageLine" style={{
            justifyContent: user.id === data.author ? 'flex-end' : 'flex-start'
        }}>
            <div className="messageItem" style={{
                backgroundColor: user.id === data.author ? '#dcf8c6' : "white"
            }}>
                <div className="messageText">
                    {data.body}
                </div>
            </div>
        </div>
    )
}

export default MessageItem