import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = sessionStorage.getItem('token'); // Corrected token retrieval
      console.log('Token:', token);
      if (!token) return;

      try {
        const response = await axios.post(
          'http://localhost:8002/api/users',
          
          {
            headers: {
              'Authorization': `Bearer ${token}`, // Ensure 'Bearer ' prefix
            }
          }
        );
        console.log('Response:', response);
        setUsers(response.data.data);
        setFilteredUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const result = users.filter(user =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(result);
  }, [searchTerm, users]);

  const handleStatus = async (user) => {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    try {
      const updatedUser = { ...user, is_active: !user.is_active };
      console.log('Updating user:', updatedUser);

      const response = await axios.post(
        'http://localhost:8002/api/user_IsActive',
        { email: user.email, is_active: updatedUser.is_active },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      if (response.status === 200) {
        const updatedUsers = users.map(u => u._id === user._id ? updatedUser : u);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        console.log('Updated users:', updatedUsers);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleDelete = async (user) => {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    try {
      const response = await axios.delete(
        'http://localhost:8002/api/user_Delete',
        {
          headers: { 'Authorization': `Bearer ${token}` },
          data: { email: user.email }
        }
      );

      if (response.status === 200) {
        const updatedUsers = users.filter((u) => u._id !== user._id);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1>All Registered Users</h1>
      </header>
      <nav className="sidebar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/">Analytics</a></li>
          <li><a href="/">Settings</a></li>
          <li><a href="/login">Logout</a></li>
        </ul>
      </nav>
      <main className="main-content">
        <nav className="navbar">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">Profile</a></li>
            <li><a href="/">Messages</a></li>
            <li><a href="/">Notifications</a></li>
          </ul>
        </nav>
        <section className="section">
          <h2 className="table-heading">Table of Users</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by Username or Email"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value) }}
              className="form-control"
            />
          </div>
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
                  <th scope="col">Profile Picture</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
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
                            checked={user.is_active}
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
                      <td>
                        <img src={user.url} alt="Profile" width="50" height="50" />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center' }}>No users found</td>
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
