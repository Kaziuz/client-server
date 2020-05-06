// ESTE CÖDIGO SE EJECUTA EN SERVIDOR, NO EN CLIENT
// para desplegar este archivo basta con escribir en consola
// firebase deploy --only functions -> para desplegar solo las functions

const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello johnny!");
});

const createNotification = ((notification) => {
    return admin.firestore().collection('notifications') // creamos una nueva collection llamada notifications, sino esta creada se creara automaticamente
        .add(notification)
        .then(doc => console.log('notification added', doc))
});

// esta función reaccionara cuando se creé un nuevo proyecto en la base de datos firestore
exports.projectCreated = functions.firestore
    .document('projects/{projectsId}')
    .onCreate(doc => {
    // notificamos aqui que un nuevo documento ha sido creado

    const project = doc.data();
    const notification = {
        content: 'Added a new project',
        user: `${project.authorFirstName} ${project.authorLastName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification)

})

// esta función reaccionara cuando se creé un nuevo usuario en la base de datos firestore
exports.userJoined = functions.auth.user()
    .onCreate(user => {

        return admin.firestore().collection('users')
            .doc(user.uid).get().then(doc => { // aqui tomamos ese documento que se crea cuando el usuario se registra

                const newUser = doc.data();
                const notification = {
                    content: 'New user created',
                    user: `${newUser.firstName} ${newUser.lastName}`,
                    time: admin.firestore.FieldValue.serverTimestamp()
                }

                return createNotification(notification)
            })
})