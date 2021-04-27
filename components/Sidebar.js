import { Avatar, IconButton, Button } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import { DotsVerticalIcon } from '@heroicons/react/solid'
import SearchIcon from '@material-ui/icons/Search'
import * as EmailValidator from 'email-validator'

const Sidebar = () => {
    const createChat = () => {
        const input = prompt(
            'Please enter an email address for the user you wish to chat with.'
        )

        if (!input) return null

        if (EmailValidator.validate(input)) {
            // push the chat to the dB (chats collection)
        }
    }

    return (
        <div>
            <div className="p-5 flex items-center sticky top-0 bg-white justify-between md:mt-5 bg-blue-500 py-3">
                <Avatar className="cursor-pointer hover:opacity-80" />

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
        </div>
    )
}

export default Sidebar
