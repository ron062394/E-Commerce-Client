import React, { useState, useEffect } from 'react';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products from the API
    fetch('/api/product/list')
      .then((response) => response.json())
      .then((data) => {
        // Select the last 10 items
        const last20Products = data.slice(-20);
        setProducts(last20Products);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
        <h2>Discover what's new!</h2>
        <div className="product-list">
            {products.map((product) => (
            <div key={product._id} className="product-item">
                <img src={product.images[0]} alt={product.title} />
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p className="price">${product.price.toFixed(2)}</p>
                </div>
            ))}
        </div>

    </div>
  );
}

export default Home;
