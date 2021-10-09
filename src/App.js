import React from "react";
// import logo from "./logo.svg";
// import { Counter } from "./store/counter/Counter";
import "./App.css";
import Signin from "./components/Authentication/Signin";
import Signup from "./components/Authentication/Signup";

function App() {
  return (
    <div>
      {/* <Signin /> */}
      <Signup />
    </div>
  );
}

export default App;
