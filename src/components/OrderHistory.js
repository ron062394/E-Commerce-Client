import React, { useEffect, useState } from 'react';

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch order history using an API request
    const token = localStorage.getItem('token'); // Replace with your token retrieval logic

    if (token) {
      fetch('/api/orders/history', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Ensure data is an array before setting the state
          if (Array.isArray(data)) {
            setOrders(data);
          } else {
            console.error('Invalid data format:', data);
          }
        })
        .catch((error) => console.error(error));
    }
  }, []);

  return (
    <div>
      <h1>Order History</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            {/* Display order details here */}
            <p>Order ID: {order._id}</p>
            <p>Order Date: {new Date(order.date).toLocaleString()}</p>
            <ul>
              {order.products.map((product) => (
                <li key={product.product._id}>
                  <p>Product Name: {product.product.title}</p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Price: ${product.price.toFixed(2)}</p>
                </li>
              ))}
            </ul>
            <p>Shipping Address: {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.postalCode}</p>
            <p>Order Total: ${order.orderTotal.toFixed(2)}</p>
            <p>Order Status: {order.orderStatus}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderHistory;
