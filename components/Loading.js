import Image from 'next/image'
import { Circle } from 'better-react-spinkit'

const Loading = () => {
    return (
        <center className="grid place-items-center h-screen">
            <div>
                <Image
                    src="https://www.freepnglogos.com/uploads/whatsapp-logo-png-hd-2.png"
                    width={200}
                    height={200}
                />

                <Circle className="my-4" color="#3cbc38" size={60} />
            </div>
        </center>
    )
}

export default Loading
