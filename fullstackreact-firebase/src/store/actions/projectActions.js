export const createProject = project => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore()

    const profile = getState().firebase.profile // tomamos los datos de quien crea la publicacion
    const authorId = getState().firebase.auth.uid // tomaos el id de quien crea la publicacion

    // creamos una instancia de la base de datos
    // luego creamos un nuevo documento
    firestore.collection('projects').add({
      ...project,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_PROJECT', project })
    }).then((err) => {
      dispatch({ type: 'CREATE_PROJECT_ERROR', err })
    })
  }
}