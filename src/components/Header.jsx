import {
  HeartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/utils";
import { Button } from "antd/es/radio";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserDetails({
          name: user.displayName || user.email.split("@")[0],
          email: user.email,
        });
      } else {
        setIsLoggedIn(false);
        setUserDetails(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleLogout = async () => {
    await auth.signOut();
    setIsLoggedIn(false);
    setShowProfileDropdown(false);
    navigate("/");
  };

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 items-center justify-between">
        <div className="flex items-center justify-between w-full md:w-auto">
          <a className="flex title-font font-medium items-center text-gray-900">
            <img
              src="https://farsi-theme.ir/furniro-theme/img/logo.svg"
              alt="Furniro Logo"
              className="w-10 h-10 p-2 rounded-full"
            />
            <span className="ml-2 font-bold text-2xl  text-teal-500">CHAMPIONS</span>
          </a>

          <button
            className="md:hidden ml-auto focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center space-x-6 font-bold gap-4 mt-4 md:mt-0`}
        >
          <nav className="flex flex-col  md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-8">
            <Link to="/" className=" text-teal-500">
              Home
            </Link>
            <Link to="/shop" className="text-teal-500">
              Shop
            </Link>
            <Link to="/about" className="text-teal-500">
              About
            </Link>
            <Link to="/contact" className="text-teal-500">
              Contact
            </Link>
          </nav>

          <div className="flex space-x-4 mt-4 md:mt-0">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="text-teal-500">
                  <Button
                    style={{ backgroundColor: "#3B82F6", color: "white" }}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup" className="hover:text-teal-500">
                  <Button
                    style={{ backgroundColor: "#1E40AF", color: "white" }}
                  >
                    Signup
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <div className="relative">
                  <button onClick={toggleProfileDropdown}>
                    <UserOutlined  className=" text-teal-500"/>
                  </button>
                  {showProfileDropdown && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-72 bg-white shadow-lg rounded-md p-4 z-50">
                      <p className="font-bold text-center">
                        {userDetails.name}
                      </p>
                      <p className="text-sm text-gray-600 text-center">
                        {userDetails.email}
                      </p>
                      <Link
                        to="/ToShip"
                        className="block mt-2 text-blue-500 text-center"
                      >
                        Check Delivery Status
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block mt-2 text-red-500 text-center w-full"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
                <Link to="/Wishlist">
                  <HeartOutlined  className=" text-teal-500" />
                </Link>
                <Link to="/Cart" className="relative">
                  <ShoppingCartOutlined  className=" text-teal-500" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;