import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear cart when component mounts
        clearCartBackend();

        // Redirect to dashboard after 3 seconds
        const timer = setTimeout(() => {
            navigate("/dashboard");
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [navigate]);

    const clearCartBackend = async () => {
        try {
            // Fetch request to clear the cart
            const userId = sessionStorage.getItem('userId');
            console.log(userId)
            if (!userId) {
                console.error('User ID is not available in session storage');
                return;
            }
            const response = await fetch("http://localhost:8002/api/clearCart?userId="+userId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                console.log('Cart cleared successfully');
            } else {
                console.error('Failed to clear cart');
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    return (
        <div>
            <h1>Payment Successful</h1>
            <p>Thank you for your purchase!</p>
        </div>
    );
};

export default Success;
