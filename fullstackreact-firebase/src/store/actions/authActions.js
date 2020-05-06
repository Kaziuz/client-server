// action for login user
export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    // tomamos una instancia de firebase que nos permite usar el login
    // con password y correo, esto se elige en la api de firebase
    const firebase = getFirebase()

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' })
    }).catch(err => {
      dispatch({ type: 'LOGIN_ERROR', err })
    })
  }
}

// action for user logout
export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    })
  }
}

// action for create user
export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    const firestore = getFirestore()
    // creamos un usuario en la collection 'users' de firebase con email y password
    // cuando hay respuesta de la promesa, creamos un nuevo documento
    // para ese usuario con su id y añadiendole algunos items al documento del usuario
    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then(res => {
      return firestore.collection('users').doc(res.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0] + newUser.lastName[0]
      })
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' })
    }).catch(err => {
      dispatch({ type: 'SIGNUP_ERROR', err })
    })
  }
}