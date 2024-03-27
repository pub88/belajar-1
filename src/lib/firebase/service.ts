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
import bcrypt from "bcryptjs"; 

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

export async function signIn(userData: {email:string}) {
    const q = query(
        collection(firestore, "users"),
        where('email',"==", userData.email)
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    if (data) {
        return data[0];
    } else {
        return null;
    }
}

export async function signUp(
    userData: {
        email: string,
        fullname: string,
        password: string,
        role: string,
    },
    callback: Function
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

    if(data.length > 0) {
        callback({
            success: false,
            message: "Email already exists in Firebase"
        });
    } else {
        // hashing password
        userData.password = await bcrypt.hash(userData.password, 10);
        userData.role = 'member';
        // pushdata ke firebase
        await addDoc(collection(firestore, "users"), userData)
            .then(()=>{
                console.log("true nyoh");
                callback({
                    success: true,
                    message: "User created successfully"
                });
                // ({  message: "User created successfully"  })
                // return res.status(500)
            })
            .catch((error) => {
                console.log("false nyoh");
                callback({
                    success: false,
                    message: "error | " + error
                });
                // ({  message: "error | " + error  })
            });
    }
}