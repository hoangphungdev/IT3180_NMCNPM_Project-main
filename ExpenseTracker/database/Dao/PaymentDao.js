import { collection, getDocs, query, where, deleteDoc } from 'firebase/firestore';
import { fb_db } from '../../firebaseConfig';


export const fetchDataExpensePayment = async (props) => {
    const querySnapshot = await getDocs(query(collection(fb_db, "expense_payment"), where("expense_id", "==", props.toString())));
    const paymentsData = [];
    querySnapshot.forEach((doc) => {
        paymentsData.push(doc.data());
    });
    return paymentsData;
};

export const fetchDataDonationPayment = async (props) => {
    const querySnapshot = await getDocs(query(collection(fb_db, "donation_payment"), where("donation_id", "==", props.toString())));
    const paymentsData = [];
    querySnapshot.forEach((doc) => {
        paymentsData.push(doc.data());
    });
    return paymentsData;
};

export const fetchDataExpensePaymentbyHouseHoldId = async (props) => {
    const querySnapshot = await getDocs(query(collection(fb_db, "expense_payment"), where("household_id", "==", props.toString())));
    const paymentsData = [];
    querySnapshot.forEach((doc) => {
        paymentsData.push(doc.data());
    });
    return paymentsData;
};

export const fetchDataDonationPaymentbyHouseHoldId = async (props) => {
    const querySnapshot = await getDocs(query(collection(fb_db, "donation_payment"), where("household_id", "==", props.toString())));
    const paymentsData = [];
    querySnapshot.forEach((doc) => {
        paymentsData.push(doc.data());
    });
    return paymentsData;
};


export const deleteDataDonationPayment = async (donation_id) => {
    const q = query(collection(fb_db, "donation_payment"), where("donation_id", "==", donation_id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
    });
};

export const deleteDataExpensePayment = async (expense_id) => {
    const q = query(collection(fb_db, "expense_payment"), where("expense_id", "==", expense_id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
    });
};


export const fetchDataExpensePaymentbyHouseHoldIdAndExpenseId = async (props) => {
    const querySnapshot = await getDocs(query(collection(fb_db, "expense_payment"),
        where("expense_id", "==", props.expense_id.toString()),
        where("household_id", "==", props.household_id.toString())));

    const paymentsData = [];
    querySnapshot.forEach((doc) => {
        paymentsData.push(doc.id);
    });
    return paymentsData;
};

export const deleteDataDonationPaymentbyId = async (id) => {
    const docRef = doc(fb_db, "donation_payment", id);

    try {
        await deleteDoc(docRef);
        console.log("Document successfully deleted!");
    } catch (error) {
        console.error("Error removing document: ", error);
    }
};

export const deleteDataExpensePaymentbyId = async (id) => {
    const docRef = doc(fb_db, "expense_payment", id);

    try {
        await deleteDoc(docRef);
        console.log("Document successfully deleted!");
    } catch (error) {
        console.error("Error removing document: ", error);
    }


    if (docSnap.exists()) {
        const donationData = docSnap.data();
        const userRef = doc(fb_db, 'expenses', donationData.expense_id);
        try {
            await updateDoc(userRef, {
                total: decrement(amount),
            });
            console.log('Expenses successfully updated!');
        } catch (error) {
            console.error('Error updating expenses: ', error);
        }
    } else {
        console.log('No such document!');
    }

};

export const deleteDonationPaymentbyDate = async (date, household_id) => {
    const q = query(collection(fb_db, "donation_payment"),
        where("date", "==", date),
        where("household_id", "==", household_id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
    });
};

export const deleteExpensePaymentbyDate = async (date, household_id) => {
    const q = query(collection(fb_db, "expense_payment"),
        where("date", "==", date),
        where("household_id", "==", household_id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
    });
};


export const fetchDataExpensePaymentbyExpenseId = async (expense_id) => {
    const querySnapshot = await getDocs(query(collection(fb_db, "expense_payment"),
        where("expense_id", "==", expense_id.toString())));
    const paymentsData = [];
    querySnapshot.forEach((doc) => {
        paymentsData.push(doc.data());
    });
    return paymentsData;
};
