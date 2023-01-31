// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAbLXKroKXYYWLZO-8bJbAJEqSFavD9Jos",
    authDomain: "flexfoxfantasy.firebaseapp.com",
    databaseURL: "https://flexfoxfantasy-default-rtdb.firebaseio.com",
    projectId: "flexfoxfantasy",
    storageBucket: "flexfoxfantasy.appspot.com",
    messagingSenderId: "979561182601",
    appId: "1:979561182601:web:7d7a8d2f710a1af33f1d58"
};


// Initialize Firebase

const firebase = initializeApp(firebaseConfig);

export default firebase