import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Contact from "./pages/Contact";
import Productcomparison from "./pages/ProductComparison";
import LoginForm from "./pages/Login";
import SignUp from "./pages/Signup";
import ProductDetails from "./components/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import CheckoutPage from "./pages/Checkout";
import AdminPage from "./pages/adminpanel";
import ToShip from "./pages/toship";
import Shop from "./pages/Shop";
import About from "./pages/About";


function AppRouter(){

    return (
        <>
        <BrowserRouter>
      <Header    />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<LoginForm />} />
            <Route path="/Signup" element={<SignUp />} />
            <Route path="Contact" element={<Contact />}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/about" element={<About/>} />
            <Route path="Cart" element={<Cart />}/>
            <Route path="Wishlist" element={<Wishlist />}/>
            <Route path="Product/:id" element={<ProductDetails />}/>
            <Route path="ProductComparison" element={<Productcomparison />}/>
            <Route path="Checkout" element={<CheckoutPage />}/>
            <Route path="/toship" element={<ToShip/>}/>
            <Route path="adminpanel" element={<AdminPage/>}/>


        </Routes> 
        </BrowserRouter>
        </>
    )
}

export default AppRouter;