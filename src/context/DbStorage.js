import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

export const saveInFirebaseDb = async (dbName, data) => {
	console.log(dbName, data);
	const db = getFirestore();
	try {
		console.log(dbName, data);
		await setDoc(doc(db, dbName, `${Date.now()}`), data);
	} catch (e) {
		console.warn(e);
	}
};
