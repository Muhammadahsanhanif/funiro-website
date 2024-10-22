import React, { useState, useEffect } from "react";
import { db } from "../utils/utils.js"; // Import your Firebase config
import { collection, getDocs, updateDoc, doc } from "firebase/firestore"; // Firestore functions
import { Spin } from "antd";

// Admin panel to manage orders
const AdminPanel = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Update order status in Firestore
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
      // Update local state after the status is updated in Firestore
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl text-center font-bold mb-4">Admin Panel - Orders</h2>
      <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4">Order ID</th>
            <th className="py-2 px-4">Customer Name</th>
            <th className="py-2 px-4">Total Price</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Cart Items</th> {/* Added Cart Items Header */}
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="transition-transform duration-300 hover:scale-105">
              <td className="border px-4 py-2">{order.id}</td>
              <td className="border px-4 py-2">{order.userDetails.name}</td>
              <td className="border px-4 py-2">${order.totalPrice}</td>
              <td className="border px-4 py-2">{order.status}</td>
              <td className="border px-4 py-2">
                {/* Display cart items */}
                <ul>
                  {order.cartItems && order.cartItems.length > 0 ? (
                    order.cartItems.map((item, index) => (
                      <li key={index} className="transition-colors duration-300 hover:text-blue-600">
                        {item.name} ( {item.title}) - ${item.price.toFixed(2)}
                      </li>
                    ))
                  ) : (
                    <li>No items</li>
                  )}
                </ul>
              </td>
              <td className="border px-4 py-2">
                {order.status === "pending" ? (
                  <button
                    onClick={() => handleStatusUpdate(order.id, "delivered")}
                    className="bg-green-500 text-white px-4 py-1 rounded transition-colors duration-300 hover:bg-green-600"
                  >
                    Mark as Delivered
                  </button>
                ) : (
                  <span className="text-green-600">Delivered</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Admin page component that directly shows the admin panel
const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminPanel />
    </div>
  );
};

export default AdminPage;
