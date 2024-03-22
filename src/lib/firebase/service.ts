import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    where
} from "firebase/firestore";
import { app } from "./init";

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

export async function signUp(
    userData: {
        email: string;
        fullname: string;
        password: string;
    }, callback: Function
) {
    const q = query(
        collection(firestore, "users"),
        where('email',"==", userData.email)
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc)=>({
        id: doc.id,
        ...doc.id(),
    }));
    const apt = await snapshot.docs.map((doc)=>({
        ...doc.data(),
        id:doc.id
    }));

    if(data.length > 0) {
        return callback({
            success: false,
            message: "Email already exists"
        });
    } else {
        return callback({
            success: true,
            message: "Success"
        });
    }
}