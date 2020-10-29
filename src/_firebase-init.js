import * as firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/auth';
// Set the configuration for your app
// TODO: Replace with your app's config object
var firebaseConfig = {
  apiKey: "AIzaSyCkgVrCsehnMDWyyjjGjNXIfBQ4fu24w-0",
  authDomain: "vue-mag.firebaseapp.com",
  databaseURL: "https://vue-mag.firebaseio.com",
  projectId: "vue-mag",
  storageBucket: "vue-mag.appspot.com",
  messagingSenderId: "732633263029",
  appId: "1:732633263029:web:7242685f3bbadc3545c7fc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
