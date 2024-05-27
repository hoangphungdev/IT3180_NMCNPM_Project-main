import { fb_db } from '../../firebaseConfig';
import { doc, getDoc, getDocs, collection, query, where, updateDoc } from '@firebase/firestore';



export const fetchDataCitizen = async () => {
    const querySnapshot = await getDocs(collection(fb_db, "citizens"));
    const citizensData = [];
    querySnapshot.forEach((doc) => {
        citizensData.push(doc.data());
    });
    return citizensData;
};


export const fetchCitizensDatabyId = async (citizenId) => {
    const docRef = doc(fb_db, 'citizens', citizenId.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const citizenData = { id: citizenId, ...docSnap.data() };
        return citizenData;
    } else {
        console.log('No such document! (FetchCitizensDatabyId)');
    }
};

export const checkId_card_number = async (ID_card_number, screenName) => {
    if (ID_card_number === '') return true;
    const querySnapshot = await getDocs(
        query(
            collection(fb_db, 'citizens'),
            where('ID_card_number', '==', ID_card_number)
        ));
    const citizensId = [];
    querySnapshot.forEach((doc) => {
        citizensId.push(doc.id);
    });

    if (citizensId.length > 0 && screenName !== 'ChangeInforCitizen') {
        alert('Số CCCD/CMND đã tồn tại');
        return false;
    }
    return true;
}

export const fetchDataCitizenAndId = async () => {
    const querySnapshot = await getDocs(collection(fb_db, "citizens"));
    const citizensData = [];
    querySnapshot.forEach((doc) => {
        citizensData.push({ data: doc.data(), id: doc.id });
    });
    return citizensData;
};

export const updateHouseHoldIdToCitizen = async (citizenID, household_id) => {
    const userRef = doc(fb_db, 'citizens', citizenID);
    try {
        await updateDoc(userRef, {
            household_id: household_id,
        });
        console.log('Donations successfully updated!');
    } catch (error) {
        console.error('Error updating donations: ', error);
    }
}