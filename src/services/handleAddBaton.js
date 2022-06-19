import { collection, addDoc ,getFirestore} from "firebase/firestore"; 

export const handleAddBaton = async (data) => { 
    try {
        const db= getFirestore();
        const docRef = await addDoc(collection(db, "batons"), data);
        console.log("Document written with ID: ", docRef.id);

} catch (ex) { 
throw new Error(ex);
}
};