import { fb_db } from '../../firebaseConfig';
import { doc, getDoc, getDocs, collection, query, where, updateDoc } from '@firebase/firestore';


export const fetchUserData = async (userId) => {
    const docRef = doc(fb_db, 'users', userId.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const userData = docSnap.data();
        return userData;
    } else {
        console.log('No such document! (when fetching user data)');
    }
};


export const fetchUserIDbyPhoneNumber = async (phoneNumber) => {
    const querySnapshot = await getDocs(query(
        collection(fb_db, "users"), where("phoneNumber", "==", phoneNumber)));
    const usersData = [];
    querySnapshot.forEach((doc) => {
        usersData.push(doc.id);
    });
    return usersData;
};


export const updateUserPassword = async (userId, newPassword) => {
    const userRef = doc(fb_db, 'users', userId);

    try {
        await updateDoc(userRef, {
            password: newPassword
        });
        console.log('Password updated successfully');
    } catch (error) {
        console.error('Error updating password:', error);
    }
};

export const fetchUserDatabyPhoneNumber = async (phoneNumber) => {
    const querySnapshot = await getDocs(query(
        collection(fb_db, "users"), where("phoneNumber", "==", phoneNumber)));
    const usersData = [];
    querySnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, data: doc.data() });
    });
    return usersData;
};