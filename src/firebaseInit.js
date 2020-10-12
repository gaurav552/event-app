import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from "./firebaseConfig";
import 'firebase/auth'

const firebaseApp = firebase.initializeApp(firebaseConfig)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
    })
    .catch(function() {
    });
export default firebaseApp.firestore()