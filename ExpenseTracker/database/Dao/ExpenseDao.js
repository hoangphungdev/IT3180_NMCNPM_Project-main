import { collection, getDocs, doc, deleteDoc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { fb_db } from '../../firebaseConfig';

export const fetchDataExpense = async () => {
    const querySnapshot = await getDocs(collection(fb_db, "expenses"));
    const expensesData = [];
    querySnapshot.forEach((doc) => {
        expensesData.push({ data: doc.data(), id: doc.id });
    });
    return expensesData;
};

export const fetchDataExpensebyId = async (id) => {
    const docRef = doc(fb_db, 'expenses', id.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const userData = docSnap.data();
        return userData;
    } else {
        console.log('No such document!');
    }
};

export const deleteDataExpense = async (id) => {
    const docRef = doc(fb_db, "expenses", id.toString());

    try {
        await deleteDoc(docRef);
        console.log("Document successfully deleted!");
    } catch (error) {
        console.error("Error removing document: ", error);
    }
};

export const updateExpenseData = async (id, newData) => {
    const docRef = doc(fb_db, 'expenses', id.toString());

    try {
        await updateDoc(docRef, {
            total: increment(-newData),
        });
        console.log('Expense data updated successfully');
    } catch (error) {
        console.error('Error updating expense data:', error);
    }
};