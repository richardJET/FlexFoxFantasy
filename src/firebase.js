// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCU2a1ym-vyrmn_gafD07MFVnOm5F80zOY",
    authDomain: "flexfoxfantasytest.firebaseapp.com",
    projectId: "flexfoxfantasytest",
    storageBucket: "flexfoxfantasytest.appspot.com",
    messagingSenderId: "120910639441",
    appId: "1:120910639441:web:9480c5abcac04cf93ba370"
};



// Initialize Firebase

const firebase = initializeApp(firebaseConfig);

export default firebase