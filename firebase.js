import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBrIalYKjQKc_LmQkfpEJcb9yF0lCINBPQ",
  authDomain: "dadouwebshop.firebaseapp.com",
  databaseURL: "https://dadouwebshop.firebaseio.com",
  projectId: "dadouwebshop",
  storageBucket: "dadouwebshop.appspot.com",
  messagingSenderId: "501193301171",
  appId: "1:501193301171:web:690c5e2f8d88715e0d64c6",
  measurementId: "G-E1YDXJHX2E",
};
// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const db = firebase.firestore();
export const dbMenuAdd = db.collection('menuItems');
export const dbOrders = db.collection('orderItems');