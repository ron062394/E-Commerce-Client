import React, { useEffect, useState } from 'react';

function ShoppingCart() {
  const [cartData, setCartData] = useState(null);
  const [productData, setProductData] = useState({});

  useEffect(() => {
    // Fetch cart data using a JWT token
    const token = localStorage.getItem('token'); // Replace with your token retrieval logic
    if (token) {
      fetch('http://localhost:3000/api/cart/view', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setCartData(data))
        .catch((error) => console.error(error));
    }
  }, []);

  useEffect(() => {
    // Fetch product data for each product in the cart
    if (cartData) {
      const promises = cartData.items.map((item) =>
        fetch(`http://localhost:3000/api/product/get/${item.product}`, {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((data) => {
            // Store the product information by its ID
            setProductData((prevProductData) => ({
              ...prevProductData,
              [item.product]: data,
            }));
          })
          .catch((error) => console.error(error))
      );

      Promise.all(promises).catch((error) => console.error(error));
    }
  }, [cartData]);

  // Function to calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    if (cartData) {
      return cartData.items.reduce((total, item) => total + item.quantity * item.price, 0);
    }
    return 0;
  };

  const handleCheckout = () => {
    // Implement your checkout logic here
    // This function can navigate the user to a checkout page or perform the checkout process.
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartData ? (
        <div>
          {cartData.items.map((item) => (
            <div key={item._id}>
              {productData[item.product] ? (
                <div>
                  <p>Product Name: {productData[item.product].title}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <img className='shopping-cart-img' src={productData[item.product].images[0]} alt={productData[item.product].title} />
                </div>
              ) : (
                <p>Loading product information...</p>
              )}
            </div>
          ))}
          <p>Total Price: ${calculateTotalPrice().toFixed(2)}</p>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      ) : (
        <p>Your shopping cart is empty.</p>
      )}
    </div>
  );
}

export default ShoppingCart;
