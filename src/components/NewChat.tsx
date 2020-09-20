import React, { useState, SetStateAction, FC, Dispatch, useEffect } from 'react'
import './NewChat.css'
import api from '../api/api'
import ArrowBack from '@material-ui/icons/ArrowBack'

interface IChat { chatId: string | undefined, title: string, image: string }
interface IUser {
    id: string
    avatar: string
    name: string
}
interface NewChatProps {
    chatList: IChat[],
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
    user: IUser
}

const NewChat: FC<NewChatProps> = ({ chatList, setShow, show, user }) => {

    useEffect(() => {
        async function getUsers() {
            if(user !== null) {
                let results = await api.getContactList(String(user.id))
                setList(results)
            }
        }
    }, [user])

    const [list, setList] = useState<IUser[]>([])

    const addNewChat = async (user2: IUser) => {
        await api.addNewChat(user, user2)
        setShow(false)
    }

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
                        <div onClick={() => addNewChat(item)} key={index} className="newChat-item">
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