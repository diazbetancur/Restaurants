import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCNNXNw-WDwT2fc1ZDzrgjhY0Z9YqR9rYY",
    authDomain: "restaurants-c54b3.firebaseapp.com",
    projectId: "restaurants-c54b3",
    storageBucket: "restaurants-c54b3.appspot.com",
    messagingSenderId: "506176972667",
    appId: "1:506176972667:web:78af9e444382e7ab8f3fde"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig)