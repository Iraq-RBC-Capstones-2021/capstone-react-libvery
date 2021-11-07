import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../firebase";

export const storeImage = async (e, { setFileUrl, setProgress }) => {
  const file = e.target.files[0];
  const storageRef = ref(storage, file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on("state_changed", (snapshot) => {
    const progress = Math.round(
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    );
    setProgress(progress);
  });
  setFileUrl(await getDownloadURL(storageRef));
};
