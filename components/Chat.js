import { Avatar } from '@material-ui/core'
import getRecipientEmail from '../utils/getRecipientEmail'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

const Chat = ({ id, users }) => {
    const [user] = useAuthState(auth)
    const recipientEmail = getRecipientEmail(users, user)

    return (
        <div className="flex items-center cursor-pointer break-words hover:bg-gray-100">
            <Avatar className="m-5 mr-5" />
            <p>{recipientEmail}</p>
            {/* <p>{users[1]}</p> */}
        </div>
    )
}

export default Chat
