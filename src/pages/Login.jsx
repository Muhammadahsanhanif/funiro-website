import React, { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../utils/utils.js";
import { doc, getDoc } from "firebase/firestore";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e) {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "1234567") {
      navigate("/adminpanel");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      if (userData && userData.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
      console.log("Login successful");
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleSigninWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      if (user.email === "admin@gmail.com" || (userData && userData.isAdmin)) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6">
      {/* Wavy background */}
      <div className="absolute inset-0">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,160L40,160C80,160,160,160,240,170.7C320,181,400,203,480,218.7C560,235,640,245,720,224C800,203,880,149,960,128C1040,107,1120,117,1200,133.3C1280,149,1360,171,1400,181.3L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          ></path>
        </svg>
      </div>

      <h1 className="text-5xl font-extrabold text-center mb-8 text-teal-500 drop-shadow-lg">
        LOGIN!
      </h1>
      <div className="relative bg-white p-10 rounded-xl shadow-2xl w-full max-w-lg z-10 animate-slide-up transform transition-transform duration-500 ease-out">
        <form onSubmit={onSubmit} className="flex flex-col space-y-6">
          <input
            value={email}
            type="email"
            placeholder="Enter your email"
            required
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition-transform transform duration-300 ease-in-out hover:scale-105 shadow-md"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            value={password}
            type="password"
            placeholder="Enter your password"
            required
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition-transform transform duration-300 ease-in-out hover:scale-105 shadow-md"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-teal-500 text-white p-4 rounded-lg hover:bg-teal-600 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Log In
          </button>
        </form>

        <div className="flex items-center justify-center my-6">
          <span className="text-gray-600">or</span>
        </div>
        <button
          onClick={handleSigninWithGoogle}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 ease-in-out transform hover:scale-105 w-full shadow-lg"
        >
          Sign In With Google
        </button>
        <div className="text-center mt-6">
          <p className="text-gray-600">Don't have an account?</p>
          <Link
            className="underline text-lg text-blue-600 hover:text-blue-800 transition-colors duration-300"
            to="/signup"
          >
            Sign Up
          </Link>
        </div>

        {/* Display admin credentials */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold">Admin Credentials:</h2>
          <p>
            Email: <span className="font-bold">admin@gmail.com</span>
          </p>
          <p>
            Password: <span className="font-bold">1234567</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
