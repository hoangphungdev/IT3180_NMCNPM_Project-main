import { doc, getDoc, getDocs, collection, query, where } from '@firebase/firestore';
import { fb_db } from '../../firebaseConfig';
import { fetchCitizensDatabyId } from './CitizenDao';


export const fetchDataHouseHold = async () => {
    const querySnapshot = await getDocs(collection(fb_db, "households"));
    const householdsData = [];
    querySnapshot.forEach((doc) => {
        householdsData.push({ data: doc.data(), id: doc.id });
    });
    return householdsData;
};

export const fetchHouseHoldDatabyId = async (householdId) => {
    const docRef = doc(fb_db, 'households', householdId.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const householdData = docSnap.data();
        return householdData;
    } else {
        console.log('No such document!' + '(fetchHouseHoldDatabyId)');
    }
};


export const fetchDataHouseHoldAndId = async () => {
    const querySnapshot = await getDocs(collection(fb_db, "households"));
    const householdsData = await Promise.all(querySnapshot.docs.map(async (doc) => {
        const headOfHH = await fetchCitizensDatabyId(doc.data().members[0]);
        return { name: headOfHH.name, id: doc.id };
    }));
    return householdsData;
};

export const fetchHouseHoldIDbyCitizenID = async (citizenId) => {
    const querySnapshot = await getDocs(query(collection(fb_db, "households"), where("members", "array-contains", citizenId)));
    const householdsID = [];
    querySnapshot.forEach((doc) => {
        householdsID.push(doc.id);
    });
    return householdsID;
};

export const fetchCitizensIDAndHouseHoldDatabyCMND = async (ID_card_number) => {
    const querySnapshot = await getDocs(query(collection(fb_db, "citizens"), where("ID_card_number", "==", ID_card_number)));
    const citizensID = await Promise.all(querySnapshot.docs.map(async (doc) => {
        const data = await fetchHouseHoldIDbyCitizenID(doc.id);
        return { data: data, id: doc.id };
    }));
    return citizensID;
};


export const fetchCitizensIDAndHouseHoldDatabyCitizenID = async (citizen_id) => {
    const docSnapshot = await getDoc(doc(fb_db, "citizens", citizen_id));
    if (docSnapshot.exists()) {
        const data = await fetchHouseHoldIDbyCitizenID(citizen_id);
        return [{ data: data, id: citizen_id }];
    } else {
        return [];
        console.log("No such document!");
    }
};

export const fetchHouseHoldDatabyCitizenID = async (citizen_id) => {
    const querySnapshot = await getDocs(query(collection(fb_db, "households"), where("members", "array-contains", citizen_id)));
    const householdsData = [];
    querySnapshot.forEach((doc) => {
        householdsData.push(doc.id);
    });
    return householdsData;
}
