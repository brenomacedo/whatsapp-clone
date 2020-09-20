import React, { FC, SetStateAction, useEffect, useState } from 'react'
import './ChatListItem.css'

interface IChat { chatId: string | undefined, title: string, image: string , lastMessage: string }

interface ChatListItemProps {
    onClick: () => void
    active: boolean
    data: IChat
}

const ChatListItem: FC<ChatListItemProps> = ({ onClick, active, data }) => {

    const [time, setTime] = useState('')


    return (
        <div onClick={onClick} className={`chatListItem ${active ? 'active' : ''}`}>
            <img src={data.image} alt="avatar" className="chatListItem-avatar"/>
            <div className="chatListItem-lines">
                <div className="chatListItem-line">
                    <div className="chatListItem-name">{data.title}</div>
                </div>
                <div className="chatListItem-line">
                    <div className="chatListItem-lastMsg">
                        <p>{data.lastMessage} mano</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatListItem