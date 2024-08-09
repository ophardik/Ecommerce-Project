import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Portfolio.css'; // Ensure the correct path to your CSS file

function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [popup, setPopup] = useState({ visible: false, message: '' }); // Corrected state initialization
  const [cart, setCart] = useState(() => {
    // Retrieve cart from sessionStorage if it exists
    const savedCart = sessionStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    axios.post("http://localhost:8002/api/productList")
      .then(resp => {
        // Filter out products that are not deleted and inactive
        const activeProducts = resp.data.data.filter(product => !product.is_deleted && product.is_active);
        setPortfolio(activeProducts);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const userId = sessionStorage.getItem("userId");

  const addToCart = async (item) => {
        if (!userId) {
      // If userId is not found, display a popup message
      setPopup({ visible: true, message: 'You have to login first' });
      setTimeout(() => {
        setPopup({ visible: false, message: '' });
      }, 3000); // Hide popup after 3 seconds
      return; // Exit function early
    }


    const data = {
      userId: userId,
      productId: item._id,
      quantity: 1 // Initial quantity
    };

    try {
      const existingProductIndex = cart.findIndex(cartItem => cartItem.productId === item._id);
      if (existingProductIndex !== -1) {
        // If the product is already in the cart, update its quantity in the database
        data.quantity = cart[existingProductIndex].quantity + 1; // Increase quantity
      }

      // Make API call to add/update the product in the cart in the database
      const response = await axios.post("http://localhost:8002/api/addCart", data);
      console.log(response.data); // Assuming the API responds with a success message

      if (existingProductIndex !== -1) {
        // If the product is already in the cart, update its quantity in the client-side state
        const updatedCart = [...cart];
        updatedCart[existingProductIndex].quantity += 1; // Increase quantity
        setCart(updatedCart);
      } else {
        // If the product is not in the cart, add it to the client-side state
        setCart(prevCart => [...prevCart, { productId: item._id, quantity: 1 }]);
      }

      // Save updated cart to sessionStorage
      sessionStorage.setItem('cart', JSON.stringify(cart));
      setPopup({ visible: true, message: `${item.title} added to cart` });

      setTimeout(() => {
        setPopup({ visible: false, message: '' });
      }, 3000); // Hide popup after 3 seconds
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <>
      <div className="container section-title"></div>

      <section id="portfolio" className="portfolio section">
        <div className="container section-title">
          <h2>Products</h2>
          <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
        </div>
        <div className="container">
          <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
            <ul className="portfolio-filters isotope-filters">
              <li data-filter="*" className="filter-active">All</li>
              <li data-filter=".filter-app">App</li>
              <li data-filter=".filter-product">Product</li>
              <li data-filter=".filter-branding">Branding</li>
            </ul>
            <div className="row gy-4 isotope-container">
              {portfolio.map((item, index) => (
                <div key={item.id || index} className={`col-lg-4 col-md-6 portfolio-item isotope-item filter-${item.category.toLowerCase()}`}>
                  <img src={item.url} className="img-fluid" alt={item.title} />
                  <div className="portfolio-info">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <p>${item.price}</p>
                    <p>{item.category}</p>
                    <a href={item.imageUrl} title={item.title} data-gallery={`portfolio-gallery-${item.category.toLowerCase()}`} className="glightbox preview-link"></a>
                    <button onClick={() => addToCart(item)} className="btn btn-primary">Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {popup.visible && (
        <p className="popup-notification">
          {popup.message}
        </p>
      )}
    </>
  );
}

export default Portfolio;
