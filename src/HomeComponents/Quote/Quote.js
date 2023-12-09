import React from 'react';
import './Quote.style.css';

const Quote = () => {
  return (
    <div className="quote-section">
      <blockquote>
        "Spices are the essence of life, adding flavor and color to every moment."
      </blockquote>
      <p className="author">- John Doe</p>
    </div>
  );
};

export default Quote;
