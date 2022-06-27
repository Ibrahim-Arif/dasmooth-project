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
import { handleUpdateBatonStatus } from "./handleUpdateBatonStatus";
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
      collection(db, "teamMembers"),
      where("receiverId", "==", userCredential.user.uid)
    );

    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach(async (document) => {
        if (document.data().status == "pending") {
          // updating member status
          const inviteMembersRef = doc(db,"teamMembers",document.id);
          await updateDoc(inviteMembersRef, { status:"accepted"});

          // updating batons status
          const q = query(
            collection(db, "batons"),
            where("memberId", "==", document.data().receiverId)
            ,where("authorId","==",document.data().inviteBy)
          );

          onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach(async (document) => {
                // updating member status
                await handleUpdateBatonStatus(document.id, "passed", "received");
                console.log("here")
            });
          });


        }
      });
    });
    return userCredential.user;
  } catch (ex) {
    if(ex.code == 'auth/user-not-found')
      ex.message = "No user found with this email";
    else if(ex.code == 'auth/wrong-password')
      ex.message = "Wrong password";
    // console.log(ex.code)
    throw new Error(ex.message);
  }
};
