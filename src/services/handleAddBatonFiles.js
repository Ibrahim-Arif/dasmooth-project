import { collection, addDoc, setDoc,getFirestore, doc } from "firebase/firestore";

export const handleAddBatonFiles = async (data) => {
  try {
    let temp = data;
    delete temp["docId"];
    const db = getFirestore();
    const docRef = await setDoc(doc(db, "batonImages", data.batonId), temp);
    console.log("Document written with ID: ", docRef.id);
  } catch (ex) {
    throw new Error(ex);
  }
};
