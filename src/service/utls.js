import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { storage } from "../firebase";

export const storeImage = async (e, { setFileUrl }) => {
  const file = e.target.files[0];
  const storageRef = ref(storage, file.name);
  await uploadBytes(storageRef, file);
  setFileUrl(await getDownloadURL(storageRef));
};
