import React, { useState, SetStateAction, FC, Dispatch } from 'react'
import './NewChat.css'
import ArrowBack from '@material-ui/icons/ArrowBack'

interface IChat { chatId: number | undefined, title: string, image: string }
interface NewChatProps {
    chatList: IChat[],
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
    user: {
        id: number
        avatar: string
        name: string
    }
}

const NewChat: FC<NewChatProps> = ({ chatList, setShow, show, user }) => {

    const [list, setList] = useState([
        { id: 123, avatar: 'https://www.w3schools.com/howto/img_avatar.png', name: 'Breno' },
        { id: 123, avatar: 'https://www.w3schools.com/howto/img_avatar.png', name: 'Breno' },
        { id: 123, avatar: 'https://www.w3schools.com/howto/img_avatar.png', name: 'Breno' },
        { id: 123, avatar: 'https://www.w3schools.com/howto/img_avatar.png', name: 'Breno' },
        { id: 123, avatar: 'https://www.w3schools.com/howto/img_avatar.png', name: 'Breno' }
    ])

    return (
        <div className="newChat" style={{ left: show ? 0 : -415 }}>
            <div className="newChat-head">
                <div onClick={() => setShow(false)} className="newChat-backbutton">
                    <ArrowBack style={{ color: "#fff" }} />
                </div>
                <div className="newChat-headtitle">
                    Nova Conversa
                </div>
            </div>
            <div className="newChat-list">
                {list.map((item, index) => {
                    return (
                        <div key={index} className="newChat-item">
                            <img className="newChat-itemavatar" src={item.avatar} alt=""/>
                            <div className="newChat-itemname">
                                {item.name}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NewChat