import * as firebase from 'firebase'
import keys from './keys'

// Initialize Firebase
firebase.initializeApp(keys)
// firebase.analytics();

// accedemos a los datos que hay en firebase

const databaseRef = firebase.database().ref()

export const todosRef = databaseRef.child("todos")
