import React, { useEffect, useState } from 'react';

function BuyerOrderDetails({ orderId }) {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Fetch order details using the orderId
    const token = localStorage.getItem('token'); // Replace with your token retrieval logic

    if (token) {
      fetch(`/api/orders/details/${orderId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setOrder(data);
        })
        .catch((error) => console.error(error));
    }
  }, [orderId]);

  return (
    <div>
      <h1>Order Details</h1>
      {order ? (
        <div>
          <p>Order ID: {order._id}</p>
          <p>Order Date: {new Date(order.createdDate).toLocaleString()}</p>
          <p>Order Quantity: {order.quantity}</p>
          <p>Shipping Address: {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.postalCode}</p>
          <p>Order Total: ${order.orderTotal.toFixed(2)}</p>
          <p>Order Status: {order.orderStatus}</p>
          <button>View Order</button>
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
}

export default BuyerOrderDetails;
