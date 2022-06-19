import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const handleSignIn = async (email, password) => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (ex) {
    throw new Error(ex);
  }
};
