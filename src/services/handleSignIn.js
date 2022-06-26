import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
  doc,
  updateDoc,
} from "firebase/firestore";
import { handleAddTeamMember } from "./handleAddTeamMember";
export const handleSignIn = async (email, password) => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const db = getFirestore();
    const q = query(
      collection(db, "inviteMembers"),
      where("receiverId", "==", userCredential.user.uid)
    );
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach(async (document) => {
        // console.log([document.data().receiverId]);
        // console.log({
        //   email: document.data().receiverEmail,
        //   name: document.data().name,
        // });
        if (document.data().isLoginFirstTime === true) {
          const inviteMembersRef = doc(db, "inviteMembers", document.id);
          const batonQ = query(
            collection(db, "batons"),
            where("memberId", "==", document.data().receiverId),
            where("authorId", "==", document.data().inviteBy)
          );

          onSnapshot(batonQ, (querySnapshot) => {
            console.log("batonQ");
            querySnapshot.forEach(async (batonDocument) => {
              console.log(batonDocument.data());
              await updateDoc(doc(db, "batons", batonDocument.id), {
                authorPostStatus: "passed",
              });
            });
          });
          // console.log(document.id);
          await updateDoc(inviteMembersRef, { isLoginFirstTime: false });
          await handleAddTeamMember(document.data().inviteBy, {
            [document.data().receiverId]: {
              email: document.data().receiverEmail,
              name: document.data().name,
            },
          });
          console.log("first");
        }
      });
    });
    return userCredential.user;
  } catch (ex) {
    throw new Error(ex);
  }
};
