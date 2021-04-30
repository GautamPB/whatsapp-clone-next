import styled from 'styled-components'
import { auth, db } from '../firebase'
import { Avatar, IconButton, Button } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import { DotsVerticalIcon } from '@heroicons/react/solid'
import SearchIcon from '@material-ui/icons/Search'
import * as EmailValidator from 'email-validator'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import Chat from '../components/Chat'

const Sidebar = () => {
    const [user] = useAuthState(auth)
    const userChatRef = db
        .collection('chats')
        .where('users', 'array-contains', user.email)
    const [chatsSnapshot] = useCollection(userChatRef) //realtime listener

    const chatAlreadyExists = (recepientEmail) => {
        return chatsSnapshot?.docs.find(
            (chat) =>
                chat.data().users.find((user) => user === recepientEmail)
                    ?.length > 0
        )
    }

    const createChat = () => {
        const input = prompt(
            'Please enter an email address for the user you wish to chat with.'
        )

        if (!input) return null

        if (
            EmailValidator.validate(input) &&
            input !== user.email &&
            !chatAlreadyExists(input)
        ) {
            // push the chat to the dB (chats collection)
            db.collection('chats').add({
                users: [user.email, input],
            })
        }
    }

    return (
        <Container>
            <div className="p-5 flex items-center sticky top-0 bg-white justify-between md:mt-5 py-3">
                <div className="flex items-center space-x-4">
                    <Avatar
                        src={user.photoURL}
                        onClick={() => auth.signOut()}
                        className="cursor-pointer hover:opacity-80"
                    />
                    <h1 className="font-semibold">{user.email}</h1>
                </div>

                <div className="flex md:space-x-2 lg:space-x-5">
                    <IconButton>
                        <DonutLargeIcon className="cursor-pointer" />
                    </IconButton>

                    <IconButton>
                        <ChatIcon className="cursor-pointer" />
                    </IconButton>

                    <IconButton>
                        <DotsVerticalIcon className="h-5 cursor-pointer" />
                    </IconButton>
                </div>
            </div>
            <div className="flex items-center py-2 px-4 rounded-full mx-4 my-3 bg-gray-200">
                <SearchIcon />
                <input
                    type="text"
                    placeholder="Search or start a new chat"
                    className="outline-none mx-5 border-none flex-grow bg-transparent"
                />
            </div>
            <div>
                <Button onClick={createChat} className="w-full">
                    start a new chat
                </Button>
            </div>
            {/* List of chats */}
            {chatsSnapshot?.docs.map((chat) => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
        </Container>
    )
}

export default Sidebar

const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    min-width: 300px;
    overflow-y: scroll;

    ::webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
`
