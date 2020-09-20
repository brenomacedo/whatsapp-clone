import React, { FormEvent, useState, ChangeEvent, FC, useEffect, useRef } from 'react'
import Search from '@material-ui/icons/Search'
import Attach from '@material-ui/icons/AttachFile'
import More from '@material-ui/icons/More'
import InsertEmoticon from '@material-ui/icons/InsertEmoticon'
import Send from '@material-ui/icons/Send'
import Close from '@material-ui/icons/Close'
import Mic from '@material-ui/icons/Mic'
import EmojiPicker, { IEmojiData } from 'emoji-picker-react'
import './ChatWindow.css'
import MessageItem from './MessageItem'

interface ChatWindowProps {
    user: {
        id: number
        name: string
        avatar: string
    }
}

const ChatWindow: FC<ChatWindowProps> = ({ user }) => {

    let recognition: SpeechRecognition | null = null;
    let SpeechRecognition = window.SpeechRecognition
    if(SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition()
    }

    const handleEmojiClick = (e: MouseEvent, emoji: IEmojiData) => {
        setText(text + emoji.emoji)
    }

    const [emojiOpen, setEmojiOpen] = useState(false)
    const [text, setText] = useState('')
    const [listening, setListening] = useState(false)
    const [list, setList] = useState([
        { body: 'bla bla bla', date: '19:00', author: 123 },
        { body: 'bla bla bla', date: '19:00', author: 1234 },
        { body: 'bla bla bla', date: '19:00', author: 123 },{ body: 'bla bla bla', date: '19:00', author: 123 },
        { body: 'bla bla bla', date: '19:00', author: 1234 },
        { body: 'bla bla bla', date: '19:00', author: 123 },{ body: 'bla bla bla', date: '19:00', author: 123 },
        { body: 'bla bla bla', date: '19:00', author: 1234 },
        { body: 'bla bla bla', date: '19:00', author: 123 },{ body: 'bla bla bla', date: '19:00', author: 123 },
        { body: 'bla bla bla', date: '19:00', author: 1234 },
        { body: 'bla bla bla', date: '19:00', author: 123 },{ body: 'bla bla bla', date: '19:00', author: 123 },
        { body: 'bla bla bla', date: '19:00', author: 1234 },
        { body: 'bla bla bla', date: '19:00', author: 123 },{ body: 'bla bla bla', date: '19:00', author: 123 },
        { body: 'bla bla bla', date: '19:00', author: 1234 },
        { body: 'bla bla bla', date: '19:00', author: 123 },
    ])

    const bodyRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(bodyRef.current) {
            if(bodyRef.current?.scrollHeight > bodyRef.current?.offsetHeight) {
                bodyRef.current.scrollTop = bodyRef.current.scrollHeight - bodyRef.current.offsetHeight
            }
        }
    }, [list])

    const handleMicClick = () => {
        if(recognition !== null) {
            recognition.onstart = () => {
                setListening(true)
            }

            recognition.onend = () => {
                setListening(false)
            }
            recognition.onresult = e => {
                setText(e.results[0][0].transcript)
            }
            recognition.start()
        }
    }

    const handleSendClick = () => {

    }

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
            <div ref={bodyRef} className="chatWindow-body">
                {list.map((item, key) => {
                    return (
                        <MessageItem user={user} key={key} data={item} />
                    )
                })}
            </div>

            <div className="chatWindow-emojiarea" style={{ height: emojiOpen ? 200 : 0 }}>
                <EmojiPicker disableSearchBar onEmojiClick={handleEmojiClick} />
            </div>

            <div className="chatWindow-footer">
                <div className="chatWindow-pre">

                    <div onClick={() => setEmojiOpen(true)} className="chatWindow-btn">
                        <InsertEmoticon style={{ color: emojiOpen ? '#009688' : '#919191' }} />
                    </div>

                    <div style={{
                        width: emojiOpen ? 40 : 0
                    }} onClick={() => setEmojiOpen(false)} className="chatWindow-btn">
                        <Close style={{ color: '#919191' }} />
                    </div>

                </div>

                <div className="chatWindow-inputarea">
                    <input value={text} onChange={e => setText(e.target.value)}
                    placeholder="Digite uma mensagem" type="text" className="chatWindow-input"/>
                </div>

                <div className="chatWindow-pos">

                    {text === '' ? (
                        <div onClick={handleMicClick} className="chatWindow-btn">
                            <Mic style={{ color: listening ? '#126ece' : '#919191' }} />
                        </div>
                    ) : (
                        <div onClick={handleSendClick} className="chatWindow-btn">
                            <Send style={{ color: '#919191' }} />
                        </div>
                    )}



                </div>
            </div>
        </div>
    )
}

export default ChatWindow