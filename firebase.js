import firebase from 'firebase'

const firebaseConfig = {
    apiKey: 'AIzaSyCDWl6m5LsVNOw2ISLfv7K4948-fT31zfI',
    authDomain: 'whatsapp-clone-next-44b08.firebaseapp.com',
    projectId: 'whatsapp-clone-next-44b08',
    storageBucket: 'whatsapp-clone-next-44b08.appspot.com',
    messagingSenderId: '110578120553',
    appId: '1:110578120553:web:9765595f7389bc9832aff8',
}

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app()

const db = app.firestore()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }
