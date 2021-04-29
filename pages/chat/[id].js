import Head from 'next/head'
import Sidebar from '../../components/Sidebar'
import ChatScreen from '../../components/ChatScreen'
import { db } from '../../firebase'
import { data } from 'autoprefixer'

const Chat = ({ chat, messages }) => {
    return (
        <div className="flex">
            <Head>
                <title>Chat</title>
            </Head>
            <Sidebar />

            <div className="overflow-scroll scrollbar-hide h-screen">
                <ChatScreen />
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

    console.log(chat, messages)

    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat,
        },
    }
}
