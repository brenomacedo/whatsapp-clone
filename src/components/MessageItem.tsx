import React, { FC } from 'react'
import './MessageItem.css'

interface MessageItemProps {
    data: {
        body: string
        date: string
        author: number
    },
    user: {
        id: number
        name: string
        avatar: string
    }
}

const MessageItem: FC<MessageItemProps> = ({ data, user }) => {
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
                <div className="messageDate">
                    {data.date}
                </div>
            </div>
        </div>
    )
}

export default MessageItem