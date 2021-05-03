import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCRwg7ar3uuNYpLNzaG1JKq1pYL1XwskMo",
    authDomain: "nir-project-56725.firebaseapp.com",
    databaseURL: "https://nir-project-56725-default-rtdb.firebaseio.com",
    projectId: "nir-project-56725",
    storageBucket: "nir-project-56725.appspot.com",
    messagingSenderId: "393974876688",
    appId: "1:393974876688:web:ef325d6aa5f7d827bb5895",
    measurementId: "G-PRPK52FNP2",
    appName: "NirApp",
};
try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}
const fire = firebase;
export default fire;