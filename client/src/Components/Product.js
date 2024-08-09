import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css';


export default function Product() {
  const [products, setProducts] = useState([]);
  const logout=async ()=>{
    sessionStorage.clear();
    window.location.reload()
   }
 

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.post('http://localhost:8002/api/productList');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleStatus = async (productId, isActive) => {
    try {
      const response = await axios.post('http://localhost:8002/api/product_IsActive', {
        _id: productId,
        is_active: !isActive
      });
      if (response.status === 200) {
        const updatedProducts = products.map(product => {
          if (product._id === productId) {
            return { ...product, is_active: !isActive };
          }
          return product;
        });
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error('Error toggling product activity:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete("http://localhost:8002/api/productDelete", { data: { _id: productId } });
      if (response.status === 200) {
        const updatedProducts = products.filter(item => item._id !== productId);
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return ( 
    <div className="product-list">
       <a className="btn-getstarted" href="index.html/about" onClick={logout}>
      Logout
    </a>
      {products.map(product => (
        <div className="card" style={{ width: '18rem', margin: '1rem' }} key={product._id}>
          <img src={product.url} className="card-img-top" alt={product.title} />
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">{product.description}</p>
            <p className="card-text">Price: ${product.price}</p>
            <p className="card-text">Category: {product.category}</p>
            <button
              className={`btn ${product.is_active ? 'btn-success' : 'btn-secondary'}`}
              onClick={() => handleStatus(product._id, product.is_active)}
            >
              {product.is_active ? 'Active' : 'Inactive'}
            </button>
            <button className="btn btn-danger ml-2" onClick={() => handleDeleteProduct(product._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
