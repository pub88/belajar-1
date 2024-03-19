import {collection, doc, getDocs, getDoc, getFirestore} from "firebase/firestore";
import app from "./init";

const firestore = getFirestore(app);

export async function retrieveData() {
    const snapshot = await getDocs(collection(firestore, "products"));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    const data = snapshot.data();
    return data;
}