import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:8002/api/paymentDetails')
      .then(response => {
        setPayments(response.data.payment); // Update to access the payment data
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>
      <h2>Payments</h2>
      {payments && payments.length > 0 ? ( // Add a null check for payments
        <table>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Payment Method</th>
              <th>Amount</th>
              <th>Products</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment._id}>
                <td>{payment.customer_id}</td>
                <td>{payment.payment_method}</td>
                <td>{payment.amount}</td>
                <td>{payment.products.join(', ')}</td>
                <td>{new Date(payment.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No payments available</p>
      )}
    </div>
  );
}

export default AdminPanel;
