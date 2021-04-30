import firebase from 'firebase'
import { useState } from 'react'
import styled from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import { Avatar, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import { useRouter } from 'next/router'
import { useCollection } from 'react-firebase-hooks/firestore'
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined'
import MicIcon from '@material-ui/icons/Mic'
import Message from './Message'

const ChatScreen = ({ chat, messages }) => {
    const [input, setInput] = useState('')
    const [user] = useAuthState(auth)
    const router = useRouter()
    const [messagesSnapshot] = useCollection(
        db
            .collection('chats')
            .doc(router.query.id)
            .collection('messages')
            .orderBy('timestamp', 'asc')
    )

    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map((message) => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                />
            ))
        } else {
            return JSON.parse(messages).map((message) => (
                <Message
                    key={message.id}
                    user={message.user}
                    message={message}
                />
            ))
        }
    }

    const sendMessage = (e) => {
        e.preventDefault()
        //update the last seen timestamp
        db.collection('users').doc(user.uid).set(
            {
                lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
        )

        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL,
        })

        setInput('')
    }

    return (
        <div className="scrollbar-hide p-5 md:mt-5 py-3">
            <div className="flex flex-1 sticky top-0 justify-between bg-white border-b border-gray-200 z-50">
                <IconButton className="inline-block md:hidden">
                    <KeyboardBackspaceIcon
                        className="mr-5 items-center"
                        onClick={() => router.push('/')}
                    />
                </IconButton>
                <Avatar />

                <div className="ml-5 mb-5 flex flex-col w-screen">
                    <h1 className="text-xl font-semibold">Recipient Email</h1>
                    <p className="text-gray-500">Last seen...</p>
                </div>

                <div className="flex">
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <MessageContainer>{showMessages()}</MessageContainer>

            <form className="flex items-center p-5 sticky bg-white z-50 bottom-0 space-x-2">
                <EmojiEmotionsOutlinedIcon />
                <input
                    placeholder="Type a message"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex h-12 flex-grow items-center p-5 bg-gray-100 z-100 rounded-full border-none outline-none"
                    type="text"
                />
                <MicIcon />
                <button
                    type="submit"
                    hidden
                    disabled={!input}
                    onClick={sendMessage}
                >
                    Send Message
                </button>
            </form>
        </div>
    )
}

export default ChatScreen

const MessageContainer = styled.div`
    padding: 30px;
    background-color: #e5ded8;
    min-height: 90vh;
`
