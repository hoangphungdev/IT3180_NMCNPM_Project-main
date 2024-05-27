import { fb_db } from '../../firebaseConfig';
import { doc, getDoc, getDocs, collection, deleteDoc, updateDoc, increment } from '@firebase/firestore';

export const fetchDataDonation = async () => {
    const querySnapshot = await getDocs(collection(fb_db, "donations"));
    const donationsData = [];
    querySnapshot.forEach((doc) => {
        donationsData.push({ data: doc.data(), id: doc.id });
    });
    return donationsData;
};

export const deleteDataDonation = async (id) => {
    const docRef = doc(fb_db, "donations", id);

    try {
        await deleteDoc(docRef);
        console.log("Document successfully deleted!");
    } catch (error) {
        console.error("Error removing document: ", error);
    }
};

export const fetchDataDonationbyId = async (id) => {
    const docRef = doc(fb_db, 'donations', id.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const donationData = docSnap.data();
        return donationData;
    } else {
        console.log('No such document!');
    }
};

export const updateDonationData = async (id, newData) => {
    console.log(id);
    const docRef = doc(fb_db, 'donations', id.toString());

    try {
        await updateDoc(docRef, {
            total: increment(-newData),
        });
        console.log('Donation data updated successfully');
    } catch (error) {
        console.error('Error updating donation data:', error);
    }
};