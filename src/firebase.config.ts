import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAUXdLZgWpjIbJ7sdNBZ4nbL0DKrNunLt8",
    authDomain: "millionaire-pro.firebaseapp.com",
    projectId: "millionaire-pro",
    storageBucket: "millionaire-pro.appspot.com",
    messagingSenderId: "585836439005",
    appId: "1:585836439005:web:b2f368577ddc298d3a0234",
    measurementId: "G-9Q10N4VFL0",
    databaseURL: 'https://millionaire-pro-default-rtdb.europe-west1.firebasedatabase.app/'
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);