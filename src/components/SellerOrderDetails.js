import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SellerOrderDetails() {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();

  const updateOrderStatus = (newStatus) => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newStatus: newStatus }),
      })
        .then((response) => response.json())
        .then((data) => {
          // After successfully updating the order status, you can set the updated order in the state
          setOrder(data.order);
        })
        .catch((error) => console.error('Error updating order status', error));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch(`/api/orders/${orderId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setOrder(data))
        .catch((error) => console.error('Error fetching order details', error));
    }
  }, [orderId]);

  return (
    <div>
      <h1>Order Details</h1>
      {order ? (
        <div>
          <p>Order ID: {order._id}</p>
          <p>Order Date: {new Date(order.date).toLocaleString()}</p>
          <p>Buyer: {order.buyer.username}</p>
          <p>Order Status: {order.orderStatus}</p>

          <ul className="order-timeline">
            <li className={`timeline-item ${order.orderStatus === 'pending' ? 'active' : ''}`}>Pending</li>
            <li className={`timeline-item ${order.orderStatus === 'preparing to ship' ? 'active' : ''}`}>Preparing to Ship</li>
            <li className={`timeline-item ${order.orderStatus === 'shipped' ? 'active' : ''}`}>Shipped</li>
            <li className={`timeline-item ${order.orderStatus === 'product received' ? 'active' : ''}`}>Product Received</li>
          </ul>

          <ul>
            {order.products.map((product) => (
              <li key={product._id}>
                <p>Product Name: {product.title}</p>
                <p>Price: ${product.price.toFixed(2)}</p>
                <p>Quantity Ordered: {product.quantity}</p>
              </li>
            ))}
          </ul>

          <p>Shipping Address: {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.postalCode}</p>
          <p>Order Total: ${order.orderTotal.toFixed(2)}</p>
          
          {order.orderStatus === 'pending' && (
            <button onClick={() => updateOrderStatus('preparing to ship')}>Accept Order</button>
          )}
          {order.orderStatus === 'preparing to ship' && (
            <button onClick={() => updateOrderStatus('shipped')}>Item Shipped</button>
          )}
          
          <button>Back to Order History</button>
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
}

export default SellerOrderDetails;
