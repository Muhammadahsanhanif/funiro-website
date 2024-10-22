import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../utils/utils.js"; // Firebase auth and Firestore database
import { collection, addDoc } from "firebase/firestore"; // Firestore functions

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const saveUserData = async (user) => {
    try {
      const avatarUrl = user.photoURL || "https://example.com/default-avatar.png";

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || null,
        photoURL: avatarUrl,
        createdAt: new Date(),
      });
      console.log("User data saved in Firestore successfully");
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("Error saving user data to Firestore.");
    }
  };

  function onSubmit(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        await saveUserData(user);

        navigate("/");
        console.log("User created successfully");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  function handleSubmitWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;

        await saveUserData(user);

        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-6">
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
            d="M0,160L48,144C96,128,192,96,288,85.3C384,75,480,85,576,90.7C672,96,768,96,864,101.3C960,107,1056,117,1152,133.3C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <h1 className="relative text-5xl font-extrabold text-white drop-shadow-lg mb-8 z-10 ">
        Create an Account
      </h1>

      <div className="relative bg-white p-10 rounded-xl shadow-2xl w-full max-w-lg z-10 animate-slide-up transform transition-transform duration-500 ease-out">
        <form onSubmit={onSubmit} className="flex flex-col space-y-6">
          <input
            type="text"
            placeholder="Username"
            required
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition-transform transform duration-300 ease-in-out hover:scale-105 shadow-md"
          />
          <input
            value={email}
            type="email"
            placeholder="Email"
            required
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition-transform transform duration-300 ease-in-out hover:scale-105 shadow-md"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            value={password}
            type="password"
            placeholder="Password"
            required
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition-transform transform duration-300 ease-in-out hover:scale-105 shadow-md"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center justify-center my-6">
          <span className="text-gray-600">or</span>
        </div>
        <button
          onClick={handleSubmitWithGoogle}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 ease-in-out transform hover:scale-105 w-full shadow-lg"
        >
          Sign Up with Google
        </button>
        <div className="text-center mt-6">
          <p className="text-gray-600">Already have an account?</p>
          <Link
            className="underline text-lg text-blue-600 hover:text-blue-800 transition-colors duration-300"
            to="/login"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
