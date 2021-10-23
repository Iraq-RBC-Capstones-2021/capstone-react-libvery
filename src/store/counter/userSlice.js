import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setDoc, doc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { auth, db } from "../../firebase";

const initialState = {
  userName: localStorage.getItem("userName"),
  userEmail: localStorage.getItem("userEmail"),
  userPhone: localStorage.getItem("userPhone"),
  userPhoto: localStorage.getItem("userPhoto"),
  userBooks: [],
  uid: localStorage.getItem("userId"),
};

export const signUp = createAsyncThunk(
  "user/signup",
  async (data, { dispatch }) => {
    await createUserWithEmailAndPassword(
      auth,
      data.values.email,
      data.values.password
    )
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: data.values.userName,
          photoURL: data.values.userPhoto,
        });
        setDoc(doc(db, "users", userCredential.user.uid), {
          username: data.values.userName,
          email: userCredential.user.email,
          phone: data.values.userPhone,
          photo: data.fileUrl,
          uid: userCredential.user.uid,
          books: [],
          favorites: [],
        });
        dispatch(
          setActiveUser({
            userName: data.values.userName,
            userEmail: data.values.email,
            userPhone: data.values.userPhone,
            userPhoto: data.fileUrl,
            uid: userCredential.user.uid,
          })
        );
      })
      .catch((error) => {
        const { code } = error;
        const { message } = error;
        const { email } = error;
        console.log(code, message, email);
      });
  }
);
export const signIn = createAsyncThunk(
  "user/signin",
  async (data, { dispatch }) => {
    await signInWithEmailAndPassword(
      auth,
      data.emailRef.current.value,
      data.passwordRef.current.value
    )
      .then(async (userCredential) => {
        data.setErrors("");
        const docRef = doc(db, "users", userCredential.user.uid);
        const docSnap = await getDoc(docRef);
        dispatch(
          setActiveUser({
            userName: userCredential.user.displayName,
            userEmail: userCredential.user.email,
            uid: userCredential.user.email,
            userPhone:
              docSnap._document.data.value.mapValue.fields.phone.stringValue,
            userPhoto:
              docSnap._document.data.value.mapValue.fields.photo.stringValue,
          })
        );
      })
      .catch((error) => {
        data.setErrors(`Failed to sign in ${error.message}`);
        const { code } = error;
        const { message } = error;
        const { email } = error;
        console.log(code, message, email);
      });
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userPhone = action.payload.userPhone;
      state.userPhoto = action.payload.userPhoto;
      state.uid = action.payload.uid;

      localStorage.setItem("userName", state.userName);
      localStorage.setItem("userEmail", state.userEmail);
      localStorage.setItem("userPhone", state.userPhone);
      localStorage.setItem("userPhoto", state.userPhoto);
      localStorage.setItem("userId", state.uid);
    },
    setLogOut: (state) => {
      state.userName = null;
      state.userEmail = null;
      state.userPhone = null;
      state.userPhoto = null;
      localStorage.removeItem("userName", state.userName);
      localStorage.removeItem("userEmail", state.userEmail);
      localStorage.removeItem("userPhone", state.userPhone);
      localStorage.removeItem("userPhoto", state.userPhoto);
      localStorage.removeItem("userId", state.uid);
    },
  },
});

export const { setActiveUser, setLogOut } = userSlice.actions;
export const selectorUserName = (state) => state.user.userName;
export const selectorUserEmail = (state) => state.user.userEmail;
export const selectorUserPhone = (state) => state.user.userPhone;
export const selectorUserPhoto = (state) => state.user.userPhoto;
export const selectorUserId = (state) => state.user.uid;
export default userSlice.reducer;
