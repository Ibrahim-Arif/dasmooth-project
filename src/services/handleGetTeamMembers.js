import { doc, onSnapshot, getFirestore } from "firebase/firestore";
export const handleGetTeamMembers = async (uid, setData) => {
  try {
    const db = getFirestore();

    onSnapshot(doc(db, "teammembers", uid), (doc) => {
      // console.log("Current data: ", doc.data());
      // console.log(Object.assign(doc.data()));
      let data = doc.data();
      // console.log(data);
      setData(data);
    });
  } catch (ex) {
    throw new Error(ex);
  }
};
