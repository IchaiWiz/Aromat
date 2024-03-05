import React, { useState, useEffect } from 'react';
import './Quote.style.css';

const Quote = () => {
  const [quote, setQuote] = useState({ author: '', quote_text: '' });

  useEffect(() => {
    fetch('https://355c-2a06-c701-4e27-d800-900a-4b6c-1a7a-3852.ngrok-free.app/api/random-quote')
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
