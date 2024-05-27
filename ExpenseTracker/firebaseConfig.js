import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

export const firebaseConfig = {
    apiKey: "AIzaSyCv2OHiNcdGD4wzvnUXNXUFglwmpXBxRq8",
    authDomain: "quan-ly-thu-chi-2fd5f.firebaseapp.com",
    projectId: "quan-ly-thu-chi-2fd5f",
    storageBucket: "quan-ly-thu-chi-2fd5f.appspot.com",
    messagingSenderId: "94186488509",
    appId: "1:94186488509:web:68db8ed30830742bce2dd4"
};

export const fb_app = initializeApp(firebaseConfig);
export const fb_db = getFirestore(fb_app);