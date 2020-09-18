import React, { FC, SetStateAction } from 'react'
import './ChatListItem.css'

interface IChat { chatId: number | undefined, title: string, image: string }

interface ChatListItemProps {
    onClick: () => void
    active: boolean
    data: IChat
}

const ChatListItem: FC<ChatListItemProps> = ({ onClick, active, data }) => {
    return (
        <div onClick={onClick} className={`chatListItem ${active ? 'active' : ''}`}>
            <img src={data.image} alt="avatar" className="chatListItem-avatar"/>
            <div className="chatListItem-lines">
                <div className="chatListItem-line">
                    <div className="chatListItem-name">{data.title}</div>
                    <div className="chatListItem-date">19:00</div>
                </div>
                <div className="chatListItem-line">
                    <div className="chatListItem-lastMsg">
                        <p>EaeEaeEaeEaeEaeEaeEaeEaeEaeEaeEaeEaeEaeEaeEaeEaeEaeEaeEaeEaeEae mano</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatListItem