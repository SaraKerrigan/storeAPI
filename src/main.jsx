import { createRoot } from "react-dom/client";
import "./assets/font/fonts.scss";
import "./index.scss";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { YMaps } from "@pbe/react-yandex-maps";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <YMaps>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </YMaps>
  </Provider>
);
