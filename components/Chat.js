import { Avatar } from '@material-ui/core'
import getRecipientEmail from '../utils/getRecipientEmail'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db, auth } from '../firebase'
import { useRouter } from 'next/router'

const Chat = ({ id, users }) => {
    const router = useRouter(1)
    const [user] = useAuthState(auth)
    const [recipientSnapshot] = useCollection(
        db
            .collection('users')
            .where('email', '==', getRecipientEmail(users, user))
    )

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }

    const recipient = recipientSnapshot?.docs?.[0]?.data()
    const recipientEmail = getRecipientEmail(users, user)

    return (
        <div
            onClick={enterChat}
            className="flex items-center cursor-pointer break-words hover:bg-gray-100"
        >
            {recipient ? (
                <Avatar src={recipient.photoURL} className="m-5 mr-5" />
            ) : (
                <Avatar className="m-5 mr-5">{recipientEmail[0]}</Avatar>
            )}
            <p>{recipientEmail}</p>
        </div>
    )
}

export default Chat
