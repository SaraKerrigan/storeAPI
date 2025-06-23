import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import ProductPage from "./pages/product-page/ProductPage";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      {/* addProduct передали пробсом в Home */}

      <Route path={"/product/:id"} element={<ProductPage />} />
    </Routes>
  );
}

export default App;
