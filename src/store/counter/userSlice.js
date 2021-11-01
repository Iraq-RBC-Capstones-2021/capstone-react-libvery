import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setDoc, doc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { auth, db } from "../../firebase";

const initialState = {
  userName: "",
  userEmail: "",
  userPhone: "",
  userPhoto: "",
  userBooks: [],
  favorites: [],
  uid: "",
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
            books: [],
            favorites: [],
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
            userName: docSnap.data().username,
            userEmail: userCredential.user.email,
            uid: userCredential.user.uid,
            userPhone: docSnap.data().phone,
            userPhoto: docSnap.data().photo,
            favorites: docSnap.data().favorites,
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
      state.favorites = action.payload.favorites;
    },
    setLogOut: (state) => {
      state.userName = null;
      state.userEmail = null;
      state.userPhone = null;
      state.userPhoto = null;
    },
    setFavorites: (state, action) => {
      console.log("🚀 ~ file: userSlice.js ~ line 115 ~ action", action);
      const findFavBook = state.favorites.find(
        (book) => book.id === action.payload.id
      );
      if (!findFavBook) {
        state.favorites = action.payload;
      }
    },
    setRemoveFavorites: (state, action) => {
      console.log("🚀 ~ file: userSlice.js ~ line 123 ~ action", action);
      state.favorites = state.favorites.filter(
        (book) => book.id !== action.payload
      );
      console.log(
        "🚀 ~ file: userSlice.js ~ line 127 ~ state.favorites",
        state.favorites
      );
    },
  },
});

export const {
  setActiveUser,
  setLogOut,
  setUpdateUserInfo,
  setFavorites,
  setRemoveFavorites,
} = userSlice.actions;
export const selectorUser = (state) => state.user;
export default userSlice.reducer;
