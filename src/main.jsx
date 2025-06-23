import { createRoot } from "react-dom/client";
import "./assets/font/fonts.scss";
import "./index.scss";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
