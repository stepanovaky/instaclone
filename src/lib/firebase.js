import Firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"


const config = {
  apiKey: "AIzaSyCpjXxt9IEhz28vLvHEKdzB0B8b0PpiGrA",
  authDomain: "instaclone-b0e27.firebaseapp.com",
  projectId: "instaclone-b0e27",
  storageBucket: "instaclone-b0e27.appspot.com",
  messagingSenderId: "192416573620",
  appId: "1:192416573620:web:21a36b492719fb60824fe1",
  measurementId: "G-X26SBB5GH4",
}

const firebase = Firebase.initializeApp(config)
const { FieldValue } = Firebase.firestore


export { firebase, FieldValue }
