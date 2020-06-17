import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCBEfErqfaSuy6PgjQij3kqxETMdODyj2E",
    authDomain: "img-gallery-d6d72.firebaseapp.com",
    databaseURL: "https://img-gallery-d6d72.firebaseio.com",
    projectId: "img-gallery-d6d72",
    storageBucket: "img-gallery-d6d72.appspot.com",
    messagingSenderId: "855798472224",
    appId: "1:855798472224:web:4c4be965157200de442645",
    measurementId: "G-YV223JJH8K"
};

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();

export {
    storage, firebase as default
};