import { useEffect, useState } from "react";
import { db } from "../utils/utils"; // Firebase configuration
import { collection, onSnapshot } from "firebase/firestore";
import { Spin } from "antd";

function ToShip() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const ordersRef = collection(db, "orders");

    // Real-time listener for orders
    const unsubscribe = onSnapshot(
      ordersRef,
      (snapshot) => {
        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          status: doc.data().status || "in progress", // Default status
        }));
        setOrders(ordersData);
        setIsLoading(false);
        console.log("Real-time ordersData ==>", ordersData);
      },
      (error) => {
        console.error("Error fetching orders: ", error);
        setIsLoading(false);
      }
    );

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="relative min-h-screen p-6 bg-slate-400">
      {/* Wavy Background */}
      <div className="absolute inset-0">
        <svg
          className="w-full h-48"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            fillOpacity="0.4"
            d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,74.7C960,75,1056,85,1152,96C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <h2 className="text-3xl font-bold text-white text-center mb-6 z-10 relative">
        Orders In Progress
      </h2>

      {isLoading ? (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
          <Spin size="large" />
        </div>
      ) : (
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {orders.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No orders in progress
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <img
                  src={order.cartItems[0]?.image || "https://via.placeholder.com/300"}
                  alt={`Order ${order.id}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">
                    Order Name: {order.cartItems[0]?.title || "Unnamed Item"}
                  </h3>
                  <p className="text-gray-600 mt-2">Status: {order.status}</p>
                  <p className="text-gray-600 mt-1">User: {order.username || "Unknown User"}</p> {/* Display the username */}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ToShip;
