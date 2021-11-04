import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";

import "./localization";

ReactDOM.render(
  <Suspense
    fallback={
      <Loader
        className="flex w-screen h-screen justify-center items-center bg-white"
        color="#F2E1D9"
      />
    }
  >
    <React.StrictMode>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </React.StrictMode>
  </Suspense>,
  document.getElementById("root")
);
