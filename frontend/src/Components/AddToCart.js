import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';
import { loadStripe } from '@stripe/stripe-js';

function AddToCart() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState('');
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      setError('User ID is not available in session storage');
      return;
    }

    const data = { userId: userId };
    axios.post('http://localhost:8002/api/cartList', data)
      .then((res) => {
        if (res.data.success) {
          setCart(res.data.result);
        }
      })
      .catch((err) => {
        setError('Error fetching cart data');
        console.error(err);
      });
  }, [userId]);

  const calculateTotal = () => {
    const subtotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    const tax = subtotal * 0.05;
    const shipping = 5.00;
    const total = subtotal + tax + shipping;
    return { subtotal, tax, shipping, total };
  };

  const updateCartItem = async (index, item, action) => {
    try {
      const updatedCart = [...cart]; // Create a copy of the cart array
      let newQuantity;
      if (action === 'add') {
        newQuantity = (updatedCart[index].quantity || 1) + 1;
      } else if (action === 'remove') {
        newQuantity = (updatedCart[index].quantity || 1) - 1;
        if (newQuantity <= 0) {
          updatedCart.splice(index, 1); // Remove the item from the cart
        } else {
          updatedCart[index].quantity = newQuantity;
        }
      }

      const data = {
        userId: userId,
        productId: item._id,
        quantity: newQuantity
      };

      const response = await axios.post('http://localhost:8002/api/updated', data);
      if (response.data.success) {
        setCart(updatedCart); // Update the local state with the updated cart
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const { subtotal, tax, shipping, total } = calculateTotal();

  const makePayment = async () => {
    try {
      const stripe = await loadStripe('pk_test_51PN9vERpIGMlBtUA2NzgETORMVnJkDwQzhLlIzfE9AtJvdIvU5GPdn40t70CU5IkgQPofhiPWPTQa1rfuW1eHBQe00MW3ek16A');
      const body = { products: cart, userId: userId };
      const headers = { 'Content-Type': 'application/json' };
      const response = await fetch('http://localhost:8002/api/payment', {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
      const session = await response.json();
      if (session.id) {
        await stripe.redirectToCheckout({ sessionId: session.id });
      } else {
        console.error('Payment session creation failed');
      }
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  return (
    <>
      <header id="site-header">
        <div className="container">
          <h1>Shopping Cart</h1>
        </div>
      </header>
      <div className="container">
        {error && <div className="error">{error}</div>}
        <section id="cart">
          {cart.length === 0 ? (
            <div><h1>Your cart is empty</h1></div>
          ) : (
            cart.map((item, index) => (
              <article className="product" key={index}>
                <header>
                  <img src={item.url} alt={item.title} />
                  <div className="remove">
                    <button onClick={() => updateCartItem(index, item, 'remove')}>Remove product</button>
                  </div>
                </header>
                <div className="content">
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                  <div className="color" style={{ top: 0 }} />
                  <div className="type" style={{ top: 43 }}>{item.category}</div>
                </div>
                <footer className="content">
                  <span className="qt-minus" onClick={() => updateCartItem(index, item, 'remove')}>-</span>
                  <span className="qt">{item.quantity || 1}</span>
                  <span className="qt-plus" onClick={() => updateCartItem(index, item, 'add')}>+</span>
                  <h2 className="full-price">${(item.price * (item.quantity || 1)).toFixed(2)}</h2>
                  <h2 className="price">${item.price.toFixed(2)}</h2>
                </footer>
              </article>
            ))
          )}
        </section>
      </div>
      <footer id="site-footer">
        <div className="container clearfix">
          <div className="left">
            <h2 className="subtotal">Subtotal: <span>{subtotal.toFixed(2)}</span>$</h2>
            <h3 className="tax">Taxes (5%): <span>{tax.toFixed(2)}</span>$</h3>
            <h3 className="shipping">Shipping: <span>{shipping.toFixed(2)}</span>$</h3>
          </div>
          <div className="right">
            <h1 className="total">Total: <span>{total.toFixed(2)}</span>$</h1>
            <button className="btn" onClick={makePayment}>Checkout</button>
          </div>
        </div>
      </footer>
    </>
  );
}

export default AddToCart;
