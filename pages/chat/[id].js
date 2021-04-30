import Head from 'next/head'
import Sidebar from '../../components/Sidebar'
import ChatScreen from '../../components/ChatScreen'
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import getRecipientEmail from '../../utils/getRecipientEmail'

const Chat = ({ chat, messages }) => {
    const [user] = useAuthState(auth)

    return (
        <div className="flex">
            <Head>
                <title>Chat with {getRecipientEmail(chat.users, user)}</title>
            </Head>

            <div className="hidden md:inline-block">
                <Sidebar />
            </div>

            <div className="overflow-scroll scrollbar-hide h-screen">
                <ChatScreen chat={chat} messages={messages} />
            </div>
        </div>
    )
}

export default Chat

export async function getServerSideProps(context) {
    //server side rendering.
    // loads before the user loads the page on the server side.
    const ref = db.collection('chats').doc(context.query.id)

    //prep the messages on the server
    const messageRes = await ref
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .get()

    const messages = messageRes.docs
        .map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        .map((messages) => ({
            ...messages,
            timestamp: messages.timestamp.toDate().getTime(),
        }))

    //prep the chats
    const chatRes = await ref.get()
    const chat = {
        id: chatRes.id,
        ...chatRes.data(),
    }

    console.log(messages)

    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat,
        },
    }
}
