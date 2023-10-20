import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

function ProductPage() {
  const { id } = useParams(); // Get the product ID from the URL
  const { cart, dispatch } = useContext(CartContext); // Access the cart state and dispatch function

  const [product, setProduct] = useState(null);

  // State to track the quantity selected by the user
  const [quantity, setQuantity] = useState(1);

  // State to store the product's stock
  const [stock, setStock] = useState(0);

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
            dispatch({ type: 'SET_CART_COUNT', count });
          }
        })
        .catch((error) => console.error(error));
    }
  }, [dispatch]);

  // Fetch the product by ID from your API and get the stock value
  useEffect(() => {
    fetch(`/api/product/get/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setStock(data.stock); // Set the product's stock value
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      if (!product) {
        alert('Product data is still loading. Please wait.');
        return;
      }

      const productId = id;

      // Check if the user-selected quantity is valid
      if (quantity > stock) {
        alert('Order quantity exceeds available stock.');
        return;
      }

      const requestData = {
        productId,
        quantity: quantity,
      };

      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.status === 200) {
        alert('Product added to the cart successfully');
        dispatch({ type: 'ADD_TO_CART', product: product });
      } else {
        alert('Failed to add the product to the cart');
      }
    } catch (error) {
      console.error('Error adding the product to the cart:', error);
    }
  };

  return (
    <div>
      {product ? (
        <div className='product-page'>
          <div className='product-container'>
            
            <img className='cart-image' src={product.images[0]} alt={product.title} />
              <div>
                  <h2>{product.title}</h2>
                  <p>{product.description}</p>
                  <p className="price">${product.price.toFixed(2)}</p>
                  <p>Stock: {stock}</p> {/* Display the product's stock */}
                  <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                      max={stock}
                  />
                  <button onClick={handleAddToCart}>Add to Cart</button>
              </div>
              <li><Link to="/shopping-cart">View Cart</Link></li>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductPage;
