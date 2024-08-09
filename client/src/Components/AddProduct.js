import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AddProduct.css';  // Import the CSS file

export default function AddProduct() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState('');

    const logout=async ()=>{
      sessionStorage.clear();
      window.location.reload()
     }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!title || !price || !description || !category) {
            setMessage('Please fill all the fields');
            return;
        }

        const newProduct = { title, price, description, category, url };
        axios.post("http://localhost:8002/api/addProduct", newProduct)
            .then((resp) => {
                console.log("Product added successfully", resp.data)
                setMessage('Product added successfully.');
                // Reset form fields after successful submission
                setTitle('');
                setPrice('');
                setDescription('');
                setCategory('');
                setUrl('');
                setTimeout(() => {
                    setMessage('');
                }, 1000);
            })
            .catch((error) => {
                console.log("Error adding product", error)
            })
    }

    return (
        <div className="add-product-container">
            <h2>Add New Product</h2>
            <nav className="sidebar">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">Analytics</a>
          </li>
          <li>
            <a href="/">Settings</a>
          </li>
          <li>
          <a className="btn-getstarted" href="index.html/about" onClick={logout}>
      Logout
    </a>
          </li>
        </ul>
        <div className="dropdown">
        
          <ul className="dropdown-menu dropdown-menu-dark">
            <li><a className="dropdown-item" href="/users">View All Users</a></li>
          </ul>
        </div>
      
      </nav>
            <form className="add-product-form">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    required
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                />
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category"
                    required
                />
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Image URL"
                />
                <button type="submit" onClick={handleSubmit}>Add Product</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    )
}
