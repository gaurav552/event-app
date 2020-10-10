import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from "./firebaseConfig";
import 'firebase/auth'

const firebaseApp = firebase.initializeApp(firebaseConfig)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(
        // ()=>console.log("now persistent")
    )
export default firebaseApp.firestore()