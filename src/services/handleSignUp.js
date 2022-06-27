import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { generatePassword } from "../utilities/generatePassword";
import { handleForgotPassword } from "./handleForgotPassword";

export const handleSignUp = async (email,password = null) => {
  try {
    const auth = getAuth();
    if (password ==null) 
        password = generatePassword(6);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if(password == null)
        await handleForgotPassword(userCredential.user.email);
    else
        await sendEmailVerification(userCredential.user);
    return userCredential.user;
  } catch (ex) {
    if(ex.code == "auth/email-already-in-use")
      ex.message = "Email already in use!";
    throw new Error(ex.message);
  }
};
