import React, { useState } from 'react'
import DonutLarge from '@material-ui/icons/DonutLarge'
import Chat from '@material-ui/icons/Chat'
import MoreVert from '@material-ui/icons/MoreVert'
import Search from '@material-ui/icons/Search'
import ChatListItem from './components/ChatListItem'
import './App.css'

function App() {

  const [chatList, setChatList] = useState([1, 2, 3, 4,5,5,5,5,5,5])

  return (
    <div className="app-window">
      <div className="sidebar">
         <header>
          <img className="header-avatar" src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar"/>
          <div className="header-buttons">
            <div className="header-btn">
              <DonutLarge style={{ color: '#919191' }} />
            </div>
            <div className="header-btn">
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
          {chatList.map(l => {
            return (
              <ChatListItem />
            )
          })}
         </div>
      </div>
      <div className="contentarea">

      </div>
    </div>
  );
}

export default App;
