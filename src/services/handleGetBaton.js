import { doc, getDoc, getFirestore } from "firebase/firestore";

export const handleGetBaton = async (batonId) => {
  try {
    const db = getFirestore();
    const docRef = doc(db, "batons", batonId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return {
        docId: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      return false;
    }
  } catch (ex) {
    throw new Error(ex);
  }
};
