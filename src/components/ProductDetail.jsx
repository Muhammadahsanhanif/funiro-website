import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { db } from "../utils/utils.js";
import { collection, addDoc, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";
import { Spin } from "antd";
import { CartContext } from "../context/CartContext.jsx";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // Create a navigate function
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const auth = getAuth();
  const { addToCart: addToCartContext } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    const checkIfInCart = async () => {
      if (auth.currentUser) {
        try {
          const userId = auth.currentUser.uid;
          const q = query(
            collection(db, "cart"),
            where("userId", "==", userId),
            where("productId", "==", id)  // Use productId instead of title
          );
          const querySnapshot = await getDocs(q);
          setIsInCart(querySnapshot.docs.length > 0);  // Set isInCart state
        } catch (error) {
          console.error("Error checking cart:", error);
        }
      }
    };

    const checkIfLiked = async () => {
      if (auth.currentUser) {
        try {
          const userId = auth.currentUser.uid;
          const q = query(
            collection(db, "wishlist"),
            where("userId", "==", userId),
            where("productId", "==", id)
          );
          const querySnapshot = await getDocs(q);
          setIsLiked(querySnapshot.docs.length > 0);
        } catch (error) {
          console.error("Error checking wishlist:", error);
        }
      }
    };

    fetchProduct();
    checkIfInCart();  // Check if product is already in cart
    checkIfLiked();
  }, [id, auth.currentUser]);

  const addToCart = async () => {
    if (product && auth.currentUser) {
      if (!isInCart) {  // Prevent adding duplicate product
        try {
          await addDoc(collection(db, "cart"), {
            userId: auth.currentUser.uid,
            email: auth.currentUser.email,
            productId: id,  // Use productId to prevent duplicates
            title: product.title,
            price: product.price,
            image: product.image,
            description: product.description,
            quantity: 1,
          });
          addToCartContext(product); // Add product to context
          setIsInCart(true);  // Set product as carted
          alert("Product added to cart!");
        } catch (error) {
          console.error("Error adding to cart:", error);
        }
      } else {
        alert("Product is already in the cart.");
      }
    } else {
      // Redirect to the login page if the user is not logged in
      alert("Please log in to add items to your cart.");
      navigate("/Login"); // Navigate to the login page
    }
  };

  const toggleLike = async () => {
    if (auth.currentUser) {
      try {
        const userId = auth.currentUser.uid;
        const wishlistRef = collection(db, "wishlist");

        if (isLiked) {
          // Unlike the product
          const q = query(wishlistRef, where("userId", "==", userId), where("productId", "==", id));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
          });
          setIsLiked(false);
          alert("Product removed from wishlist!");
        } else {
          // Like the product
          await addDoc(wishlistRef, {
            userId: userId,
            productId: id,
            title: product.title,
            price: product.price,
            image: product.image,
            description: product.description,
          });
          setIsLiked(true);
        }
      } catch (error) {
        console.error("Error toggling like:", error);
      }
    } else {
      alert("Please log in to like items.");
      navigate("/Login"); // Navigate to the login page
    }
  };

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center"><Spin size="large" /></div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <motion.img
            src={product.image}
            alt={product.title}
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-teal-500 tracking-widest">
              {product.category}
            </h2>
            <h1 className="text-teal-500 text-3xl title-font font-medium mb-1">
              {product.title}
            </h1>
            <p className="leading-relaxed text-teal-500">{product.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <span className="mr-3">Price:</span>
              <span className="title-font font-medium text-2xl text-teal-500">
                ${product.price}
              </span>
            </div>
            <div className="flex">
              {isInCart ? (
                <motion.button
                  className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Carted
                </motion.button>
              ) : (
                <motion.button
                  onClick={addToCart}
                  className="flex ml-auto text-white bg-teal-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add to Cart
                </motion.button>
              )}
              <motion.button
                onClick={toggleLike}
                className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  fill={isLiked ? "red" : "currentColor"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
