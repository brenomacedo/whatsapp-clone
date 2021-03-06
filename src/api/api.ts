import firebase from 'firebase/app'
import 'firebase/firebase-auth'
import 'firebase/firebase-firestore'
import { Dispatch, SetStateAction } from 'react'

import { firebaseConfig } from '../config/firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

interface IList {
    author: string
    body: string
    date: number
}

interface IUser {
    id: string
    name: string
    avatar: string
}

interface IChat { chatId: string | undefined, title: string, image: string, lastMessage: string }

export default {
    fbPopup: async () => {
        const provider = new firebase.auth.FacebookAuthProvider()
        let result = await firebaseApp.auth().signInWithPopup(provider)
        return result
    },
    addUser: async (u: IUser) => {
        await db.collection('users').doc(u.id).set({
            name: u.name,
            avatar: u.avatar
        }, { merge: true })
    },
    getContactList: async (id: string) => {
        let list: IUser[] = []
        let results = await db.collection('users').get()
        results.forEach(result => {
            let data = result.data()
            if(result.id !== id)
            list.push({
                id: result.id,
                name: data.name,
                avatar: data.avatar
            })
        })
        return list
    },
    addNewChat: async (user: IUser, user2: IUser) =>  {
        let newChat = await db.collection('chats').add({
            messages: [],
            users: [user.id, user2.id]
        })

        db.collection('users').doc(user.id).update({
            chats: firebase.firestore.FieldValue.arrayUnion({
                chatId: newChat.id,
                title: user2.name,
                image: user2.avatar,
                with: user2.id
            })
        })

        db.collection('users').doc(user2.id).update({
            chats: firebase.firestore.FieldValue.arrayUnion({
                chatId: newChat.id,
                title: user.name,
                image: user.avatar,
                with: user.id
            })
        })
    },
    onChatList: (userId: string, setChatList: Dispatch<SetStateAction<IChat[]>>) => {
        return db.collection('users').doc(userId).onSnapshot((doc) => {
            if(doc.exists) {
                let data: any = doc.data()
                if(data.chats) {
                    setChatList(data.chats)
                }
            }
        })
    },
    onChatContent: (chatId: string | undefined, setList: Dispatch<SetStateAction<IList[]>>,
        setUsers: Dispatch<SetStateAction<string[]>>) => {
        return db.collection('chats').doc(chatId).onSnapshot((doc) => {
            if(doc.exists) {
                let data: any = doc.data
                setList(data.messages)
                setUsers(data.users)
            }
        })
    },
    sendMessage: async (chatData: IChat, userId: string, type: string, body: string, users: string[]) => {
        db.collection('chats').doc(chatData.chatId).update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                type,
                author: userId,
                body,
                date: new Date()
            })
        })

        for(let i in users) {
            let u = await db.collection('users').doc(users[i]).get()
            let uData: any = u.data()
            if(uData.chats) {
                let chats = {...uData.chats}
                for(let e in chats) {
                    if(chats[e].chatId == chatData.chatId ) {
                        chats[e].lastMessage = body
                        chats[e].lastMessageDate = Date.now()
                    }
                }

                await db.collection('users').doc(users[i]).update({
                    chats
                })
            }
        }
    }
}