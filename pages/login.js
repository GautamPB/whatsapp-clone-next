import Head from 'next/head'
import Image from 'next/image'
import { Button } from '@material-ui/core'
import { auth, provider } from '../firebase'

const login = () => {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert)
    }

    return (
        <div className="bg-gray-100 h-screen grid place-items-center">
            <Head>
                <title>Login</title>
            </Head>

            <div className="flex flex-col items-center bg-white p-20 rounded-2xl shadow-xl">
                <Image
                    height={200}
                    width={200}
                    src="https://www.freepnglogos.com/uploads/whatsapp-logo-png-hd-2.png"
                />
                <Button onClick={signIn}>Sign in with Google</Button>
            </div>
        </div>
    )
}

export default login
