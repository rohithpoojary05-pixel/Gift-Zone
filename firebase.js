// ==========================================
// GIFT ZONE - FIREBASE CONNECTION
// Authentication + Firestore
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// ==========================================
// YOUR FIREBASE PROJECT CONFIGURATION
// ==========================================

const firebaseConfig = {
    apiKey: "AIzaSyDsA7O5FkbL6Zaf1RxVvDZvnnf_Q84rMXM",
    authDomain: "gift-zone-53de8.firebaseapp.com",
    projectId: "gift-zone-53de8",
    storageBucket: "gift-zone-53de8.firebasestorage.app",
    messagingSenderId: "697287835963",
    appId: "1:697287835963:web:c2905d5798270a1d2cf71e",
    measurementId: "G-FS4M6YJX27"
};


// ==========================================
// INITIALIZE FIREBASE
// ==========================================

const app = initializeApp(firebaseConfig);


// ==========================================
// INITIALIZE AUTHENTICATION
// ==========================================

const auth = getAuth(app);


// ==========================================
// INITIALIZE FIRESTORE DATABASE
// ==========================================

const db = getFirestore(app);


// ==========================================
// EXPORT FIREBASE SERVICES
// ==========================================

export {
    app,
    auth,
    db
};
