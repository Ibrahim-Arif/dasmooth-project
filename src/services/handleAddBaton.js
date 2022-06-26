import { collection, addDoc, getFirestore } from "firebase/firestore";

export const handleAddBaton = async (data) => {
  try {
    let temp = data;
    delete temp["docId"];
    const db = getFirestore();
    const docRef = await addDoc(collection(db, "batons"), temp);
    console.log("Document written with ID: ", docRef.id);
  } catch (ex) {
    throw new Error(ex);
  }
};
