import authReducer from './authReducer'
import projectReducer from './projectReducer'

import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore' // las bases de datos se actualizan y por ende los datos en la ui
import { firebaseReducer } from 'react-redux-firebase' // nos da acceso al auth de quien esta loguin

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer