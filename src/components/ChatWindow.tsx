import React from 'react'
import Search from '@material-ui/icons/Search'
import Attach from '@material-ui/icons/AttachFile'
import More from '@material-ui/icons/More'
import './ChatWindow.css'

const ChatWindow = () => {
    return (
        <div className="chatWindow">
            <div className="chatWindow-header">

                <div className="chatWindow-headerinfo">
                    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" className="chatWindow-avatar"/>
                    <div className="chatWindow-name">Breno Macêdo</div>
                </div>

                <div className="chatWindow-headerbuttons">

                    <div className="chatWindow-btn">
                        <Search style={{ color: '#919191' }} />
                    </div>
                    <div className="chatWindow-btn">
                        <Attach style={{ color: '#919191' }} />
                    </div>
                    <div className="chatWindow-btn">
                        <More style={{ color: '#919191' }} />
                    </div>

                </div>

            </div>
            <div className="chatWindow-body">

            </div>
            <div className="chatWindow-footer">

            </div>
        </div>
    )
}

export default ChatWindow