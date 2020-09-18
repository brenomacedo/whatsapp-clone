import React from 'react'
import './ChatListItem.css'

const ChatListItem = () => {
    return (
        <div className="chatListItem">
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" className="chatListItem-avatar"/>
            <div className="chatListItem-lines">
                <div className="chatListItem-line">
                    <div className="chatListItem-name">Breno Macêdo</div>
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