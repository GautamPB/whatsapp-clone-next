import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { Avatar, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import { useRouter } from 'next/router'

const ChatScreen = ({ chat, messages }) => {
    const [user] = useAuthState(auth)
    const router = useRouter()

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

            <div className="messagecontainer">
                {/* show messages */}
                {/* end of messages */}
            </div>
        </div>
    )
}

export default ChatScreen
