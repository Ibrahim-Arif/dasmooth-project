import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";
export const handleGetMyBatons = async (uid, data, setData) => {
  try {
    const db = getFirestore();
    const q = query(collection(db, "batons"), where("authorId", "==", uid));

    // const q = query(collection(db, "batons"), where("memberId", "==", uid));
    // onSnapshot(q, (querySnapshot) => {
    //   let tempData = [];
    //   querySnapshot.forEach((doc) => {
    //     tempData.push({ docId: doc.id, ...doc.data() });
    //   });
    //   setData([...data, ...tempData]);
    // });

    onSnapshot(q, (querySnapshot) => {
      let tempData = [];
      querySnapshot.forEach((doc) => {
        tempData.push({ docId: doc.id, ...doc.data() });
      });
      console.log(tempData);
      setData([...data, ...tempData]);
    });
  } catch (ex) {
    throw new Error(ex);
  }
};
