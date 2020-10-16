import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from "./firebaseConfig";
import 'firebase/auth'

const firebaseApp = firebase.initializeApp(firebaseConfig)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() =>{
    })
    .catch((err) => {
        console.log(err)
    });
export default firebaseApp.firestore()