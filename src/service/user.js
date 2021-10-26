import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase";

export const updateUserProfile = async ({
  uid,
  usernameRef,
  userName,
  phoneRef,
  userPhone,
}) => {
  const updateUserInfo = doc(db, "users", uid);
  await updateDoc(updateUserInfo, {
    username: usernameRef.current.value || userName,
    phone: phoneRef.current.value || userPhone,
  });
};
