import React, { useState } from 'react'
import DonutLarge from '@material-ui/icons/DonutLarge'
import Chat from '@material-ui/icons/Chat'
import MoreVert from '@material-ui/icons/MoreVert'
import Search from '@material-ui/icons/Search'
import ChatListItem from './components/ChatListItem'
import './App.css'
import ChatIntro from './components/ChatIntro'
import ChatWindow from './components/ChatWindow'
import NewChat from './components/NewChat'
import Login from './components/Login'
import api from './api/api'

function App() {

  interface IChat { chatId: string | undefined, title: string, image: string }
  interface IUser {
    id: string
    name: string
    avatar: string
  }

  const [chatList, setChatList] = useState<IChat[]>([])
  const [activeChat, setActiveChat] = useState<IChat>({ chatId: undefined, title: 'hello world', image: 'https://www.w3schools.com/howto/img_avatar.png' })
  const [user, setUser] = useState<IUser | null>(null)
  const [showNewChat, setShowNewChat] = useState(false)

  const handleLoginData = async (u: firebase.User) => {
    let newUser = {
      id: u.uid,
      name: u.displayName ? u.displayName : 'undefined',
      avatar: u.photoURL ? u.photoURL : 'undefined'
    }
    await api.addUser({...newUser, id: u.uid})
    setUser(newUser)
  }

  if(user === null) {
    return (
      <Login onReceive={handleLoginData} />
    )
  }

  return (
    <div className="app-window">
      <div className="sidebar">
        <NewChat chatList={chatList} show={showNewChat} setShow={setShowNewChat} user={user} />
        <header>
          <img className="header-avatar" src={user.avatar} alt="avatar"/>
          <div className="header-buttons">
            <div className="header-btn">
              <DonutLarge style={{ color: '#919191' }} />
            </div>
            <div onClick={() => setShowNewChat(true)} className="header-btn">
              <Chat style={{ color: '#919191' }} />
            </div>
            <div className="header-btn">
              <MoreVert style={{ color: '#919191' }} />
            </div>
          </div>
         </header>

         <div className="search">
          <div className="search-input">
            <Search fontSize='small' style={{ color: '#919191' }} />
            <input type="search" placeholder="Procurar ou começar uma nova conversa"/>
          </div>
         </div>

         <div className="chatlist">
          {chatList.map((l, index) => {
            return (
              <ChatListItem data={l} active={activeChat.chatId === l.chatId} key={index} onClick={() => setActiveChat(chatList[index])} />
            )
          })}
         </div>
      </div>
      <div className="contentarea">
        {activeChat.chatId !== undefined && (
          <ChatWindow user={user} />
        )}
        {activeChat.chatId === undefined && (
          <ChatIntro />
        )}
      </div>
    </div>
  );
}

export default App;
