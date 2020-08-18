import firebase from 'firebase/app'
import 'firebase/auth'
import  'firebase/firestore'
import  'firebase/storage'



const firebaseConfig = {
    apiKey: "AIzaSyCE6npgUyp1z89syfYg9RU_nu5cerjZ57w",
    authDomain: "fir-redux-96f5b.firebaseapp.com",
    databaseURL: "https://fir-redux-96f5b.firebaseio.com",
    projectId: "fir-redux-96f5b",
    storageBucket: "fir-redux-96f5b.appspot.com",
    messagingSenderId: "992321731218",
    appId: "1:992321731218:web:82f08dc9de3485c3a4044b",
    measurementId: "G-W20L30HDBQ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth()

  const storage = firebase.storage()  
  const db = firebase.firestore()

  export {auth, firebase, db, storage}