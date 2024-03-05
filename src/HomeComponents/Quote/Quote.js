import React, { useState, useEffect } from 'react';
import './Quote.style.css';

const Quote = () => {
  const [quote, setQuote] = useState({ author: '', quote_text: '' });

  useEffect(() => {
    fetch('http://10.0.0.12:5000/api/random-quote')
      .then(response => response.json())
      .then(data => setQuote(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="quote-section">
      <blockquote>
        "{quote.quote_text}"
      </blockquote>
      <p className="author">- {quote.author}</p>
    </div>
  );
};

export default Quote;
