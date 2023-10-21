import React, { useState, useEffect } from 'react';

function CartItems({ item, productData, onIncrement, onDecrement }) {
  return (
    <div>
      <p>Product Name: {productData[item.product].title}</p>
      <div>
        <button onClick={() => onDecrement(item.product)}>-</button>
        <span>Quantity: {item.quantity}</span>
        <button onClick={() => onIncrement(item.product)}>+</button>
      </div>
      <p>Price: ${item.price.toFixed(2)}</p>
      <img className='shopping-cart-img' src={productData[item.product].images[0]} alt={productData[item.product].title} />
    </div>
  );
}

export default CartItems;
