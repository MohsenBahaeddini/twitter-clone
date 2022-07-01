import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CurrentUserProvider } from "./components/CurrentUserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CurrentUserProvider>
    <App />
  </CurrentUserProvider>
);
