import {
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    where
} from "firebase/firestore";
import { app } from "./init";
import bcrypt from "bcrypt"; 

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
        role?: string;
    }, callback: Function
) {
    const q = query(
        collection(firestore, "users"),
        where('email',"==", userData.email)
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    // const apt = await snapshot.docs.map((doc)=>({
    //     ...doc.data(),
    //     id:doc.id
    // }));

    if(data.length > 0) {
        console.log(data);
        callback({
            success: false,
            message: "Email already exists"
        });
    } else {
        console.log(data);
        userData.password = await bcrypt.hash(userData.password, 10);
        userData.role = 'member';
        await addDoc(collection(firestore, "users"), userData)
            .then(()=>{
                callback({
                    success: true,
                    message: "User created successfully"
                })
            })
            .catch((error) => {
                callback({
                    success: false,
                    message: error
                });
            });
    }
}