import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

export const saveInFirebaseDb = async (dbName, data) => {
	const db = getFirestore();
	try {
		await setDoc(doc(db, dbName, `${Date.now()}`), data);
	} catch (e) {
		console.warn(e);
	}
};
