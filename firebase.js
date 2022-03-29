import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDZ0TIh0RE0WXglWUEaAictqsSQiqYhNXE',
  authDomain: 'driven-cabinet-345520.firebaseapp.com',
  projectId: 'driven-cabinet-345520',
  storageBucket: 'driven-cabinet-345520.appspot.com',
  messagingSenderId: '749362110007',
  appId: '1:749362110007:web:af800aa94cf23f375929b2',
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const db = app.firestore()

export { db }
