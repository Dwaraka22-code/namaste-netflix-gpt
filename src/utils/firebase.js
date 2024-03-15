// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBZ32_MxRfq15HJTi0xf8adzw_-dz3Yh0M',
  authDomain: 'netflixgpt-4de14.firebaseapp.com',
  projectId: 'netflixgpt-4de14',
  storageBucket: 'netflixgpt-4de14.appspot.com',
  messagingSenderId: '466496362586',
  appId: '1:466496362586:web:adb163e17f59ff06d12063',
  measurementId: 'G-ML5BNH764R',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// eslint-disable-next-line
const analytics = getAnalytics(app);

export const auth = getAuth();
