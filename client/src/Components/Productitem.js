import React, { useEffect } from 'react';

const Productitem = ({ title, description, imageUrl, price }) => {

  return (
    
    <div className="product-item">
      <img src={imageUrl} alt={title} />
      <div className="product-info">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Price: ${price}</p>
        {/* Add any additional logic or UI elements here */}
      </div>
    </div>
  );
};

export default Productitem;
