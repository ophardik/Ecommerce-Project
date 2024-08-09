import React, { useEffect, useState } from 'react';

import './Dashboard.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);


 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post('http://localhost:8002/api/users');
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleStatus = async (user) => {
    try {
      // Toggle the is_active status of the user
      const updatedUser = { ...user, is_active: !user.is_active };
  
      // Send a POST request to update the user's status
      const response = await axios.post('http://localhost:8002/api/user_IsActive', { email: user.email, is_active: updatedUser.is_active });
  
      if (response.status === 200) {
        // Update the user's status in the users array without modifying other users
        const updatedUsers = users.map(u => u._id === user._id ? updatedUser : u);
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };
  
  const handleDelete = async (user) => {
    try {
      const response = await axios.delete(`http://localhost:8002/api/user_Delete`, { data: { email: user.email } });
      if (response.status === 200) {
        const updatedUsers = users.filter((u) => u._id !== user._id);
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1>Dashboard</h1>
      </header>
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
            <a href="/login">Logout</a>
          </li>
        </ul>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Users
          </button>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li><a className="dropdown-item" href="/users">View All Users</a></li>
          </ul>
        </div>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Products
          </button>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li><Link to="/product" className="dropdown-item">View All Product</Link></li>
            <li><Link to="/addProduct" className="dropdown-item">Add Product</Link></li>
          </ul>
        </div>
      </nav>
      <main className="main-content">
        <nav className="navbar">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">Profile</a>
            </li>
            <li>
              <a href="/">Messages</a>
            </li>
            <li>
              <a href="/">Notifications</a>
            </li>
          </ul>
        </nav>
        <section className="section">
          <h2 className="table-heading">Table of Users</h2>
          <div className="table-container">
            <table className="table table-success table-striped">
              <thead>
                <tr>
                  <th scope="col">Sr.No</th>
                  <th scope="col">UserName</th>
                  <th scope="col">_id</th>
                  <th scope="col">Email-id</th>
                  <th scope="col">DOB</th>
                  <th scope="col">is_active</th>
                  <th scope="col">is_deleted</th>
                  <th scope="col">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{user.userName}</td>
                      <td>{user._id}</td>
                      <td>{user.email}</td>
                      <td>{user.dob}</td>
                      <td>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={user.is_active === true} // Explicitly check if user.is_active is true
                            onChange={() => handleStatus(user)}
                          />
                          <label className="form-check-label"></label>
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={user.is_deleted}
                            onChange={() => handleDelete(user)}
                          />
                          <label className="form-check-label"></label>
                        </div>
                      </td>
                      <td>{user.role}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center' }}>No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
