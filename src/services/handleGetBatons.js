import { collection, query, where, onSnapshot,getFirestore } from "firebase/firestore";
export const handleGetBatons = async (uid,setData) => { 

try {
    const db= getFirestore()
     const q = query(collection(db, "batons"), where("authorId", "==", uid));
     const unsubscribe = onSnapshot(q, (querySnapshot) => {
       const data = [];
       querySnapshot.forEach((doc) => {
           data.push({docId:doc.id ,...doc.data()});
       });
       setData(data)
     });
   
} catch (ex) { 
throw new Error(ex);
}
};