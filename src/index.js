import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store/store'
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
