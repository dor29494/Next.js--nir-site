import 'firebase/auth';
import firebase from "firebase/app"


  var firebaseConfig = {
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
    // Initialize Firebase
    if (typeof window !== 'undefined' && !firebase.apps.length) {
      console.log('init firebase');
      firebase.initializeApp(firebaseConfig);
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
      // firebase.analytics();
    }
  
    export {firebase}

