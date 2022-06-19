import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { generatePassword } from "../utilities/generatePassword";
import { handleForgotPassword } from "./handleForgotPassword";

export const handleSignUp = async (email) => {
  try {
    const auth = getAuth();
    let password = generatePassword(6);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await handleForgotPassword(userCredential.user.email);
    return userCredential.user;
  } catch (ex) {
    throw new Error(ex);
  }
};
