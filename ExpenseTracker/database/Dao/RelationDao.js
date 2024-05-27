import { collection, getDocs } from 'firebase/firestore';
import { fb_db } from './firebaseConfig';


export const fetchDataRelation = async () => {
    const querySnapshot = await getDocs(collection(fb_db, "relationships"));
    const relationsData = [];
    querySnapshot.forEach((doc) => {
        relationsData.push(doc.data());
    });
    return relationsData;
};

