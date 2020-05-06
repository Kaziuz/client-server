  import firebase from 'firebase/app'
  import 'firebase/firestore'
  import 'firebase/auth'

  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyDfhQLAtCIfCgEOrCe4BymfUkP8sjerNi8",
    authDomain: "net-ninja-marioplan-97452.firebaseapp.com",
    databaseURL: "https://net-ninja-marioplan-97452.firebaseio.com",
    projectId: "net-ninja-marioplan-97452",
    storageBucket: "net-ninja-marioplan-97452.appspot.com",
    messagingSenderId: "672965697895",
  };

  firebase.initializeApp(config);
  //firebase.firestore().settings({ timestampsInSnapshots: true }) // para que la consola no chille
  firebase.firestore() // para que la consola no chille

  export default firebase


  /*
const firebaseConfig = {
  apiKey: "AIzaSyDfhQLAtCIfCgEOrCe4BymfUkP8sjerNi8",
  authDomain: "net-ninja-marioplan-97452.firebaseapp.com",
  databaseURL: "https://net-ninja-marioplan-97452.firebaseio.com",
  projectId: "net-ninja-marioplan-97452",
  storageBucket: "net-ninja-marioplan-97452.appspot.com",
  messagingSenderId: "672965697895",
  appId: "1:672965697895:web:26e9daf482a69eec3d8fc2",
  measurementId: "G-068SNGDNJK"
};
  */