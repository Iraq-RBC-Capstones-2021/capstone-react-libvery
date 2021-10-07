import React from "react";
import logo from "./logo.svg";
import { Counter } from "./store/counter/Counter";
import "./App.css";
import Error from "./components/Error";

function App() {
  return (
    <div className="App">
      <Error />
    </div>
  );
}

export default App;
