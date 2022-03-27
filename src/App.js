import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy } from 'react';
import CartPage from "./pages/CartPage";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import ProductInfo from "./pages/ProductInfo";
import RegisterPage from "./pages/RegisterPage";
import "./stylesheets/Layout.css";
import "./stylesheets/products.css";
import "./stylesheets/Authentication.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrdersPage from "./pages/OrdersPage";
import Adminpage from "./pages/Adminpage";

import About from './components/About/About'
import Disclaimer from './components/Disclaimer/Disclaimer'
import FAQ from './components/FAQ/FAQ'
import Privacy from './components/Privacy/Privacy'
import Terms from './components/Terms/Terms'

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ProtectedRoutes>
                <Homepage />
              </ProtectedRoutes>
            }
          />
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/register" exact element={<RegisterPage />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/disclaimer" exact element={<Disclaimer />} />
          <Route path="/faq" exact element={<FAQ />} />
          <Route path="/privacy-policy" exact element={<Privacy />} />
          <Route path="/terms-and-conditions" exact element={<Terms />} />
          <Route
            path="/productinfo/:productid"
            exact
            element={
              <ProtectedRoutes>
                <ProductInfo />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/cart"
            exact
            element={
              <ProtectedRoutes>
                <CartPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/orders"
            exact
            element={
              <ProtectedRoutes>
                <OrdersPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin"
            exact
            element={
              <ProtectedRoutes>
                <Adminpage />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem("currentUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
