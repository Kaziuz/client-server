import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
//import * as serviceWorker from './serviceWorker'

// redux
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './store/reducers/rootReducer'
import thunk from 'redux-thunk'

// firebase
// redux firestore
// me permite conectar mi aplicacion
// con la base de datos
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import fbConfig from './config/fbConfig'

// le pasamos firestore y firebase al store para que los 
// componentes y acciones puedan accceder a datos
const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(fbConfig, {
      userProfile: 'users',         // nombre del documento a sincronizar
      useFirestoreForProfile: true, // sincroniza el documento de firebase para el usuario en tiempo real
      attachAuthIsReady: true,
      firebaseStateName: 'firebase'
    }),
    reduxFirestore(fbConfig)
  )
)

// solo cuando este la conexión con firebase rendereo el contenido
store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, document.getElementById('root'))
  //serviceWorker.unregister() 
})
