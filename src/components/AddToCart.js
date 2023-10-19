import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function AddToCart() {
  const { id } = useParams(); // Get the product ID from the URL
  const { cart, dispatch } = useContext(CartContext); // Access the cart state and dispatch function

  const [product, setProduct] = useState(null);

  // Fetch the user's cart data to get the cart count
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/cart/view', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.items) {
            const count = data.items.reduce((total, item) => total + item.quantity, 0);
            console.log(count)
            // Set the cart count in your CartContext using the dispatch function
            dispatch({ type: 'SET_CART_COUNT', count });
          }
        })
        .catch((error) => console.error(error));
    }
  }, [dispatch]);

  useEffect(() => {
    // Fetch the product by ID from your API
    fetch(`/api/product/get/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error(error));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      if (!product) {
        // Handle the case where the product is not available yet
        alert('Product data is still loading. Please wait.');
        return;
      }

      // Get the product ID from the route parameters
      const productId = id;

      // Create a request body with the product ID and the desired quantity
      const requestData = {
        productId,
        quantity: 1, // You can modify this to allow users to select the quantity
      };

      // Send a POST request to add the product to the cart
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.status === 200) {
        // Product added to the cart successfully
        alert('Product added to the cart successfully');

        // Dispatch an action to update the cart in the CartContext
        dispatch({ type: 'ADD_TO_CART', product: product });
      } else {
        // Handle errors, e.g., product not found or other issues
        alert('Failed to add the product to the cart');
      }
    } catch (error) {
      console.error('Error adding the product to the cart:', error);
    }
  };

  return (
    <div>
      {product ? (
        <div>
          <h2>{product.title}</h2>
          <img src={product.images[0]} alt={product.title} />
          <p>{product.description}</p>
          <p className="price">${product.price.toFixed(2)}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AddToCart;
