import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import config from './config';

function App() {
  const [fruits, setFruits] = useState([]);
  const [fruitName, setFruitName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch all fruits from the database
  useEffect(() => {
    const fetchFruits = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.apiUrl}/api/fruits`);
        setFruits(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch fruits');
        setLoading(false);
      }
    };

    fetchFruits();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!fruitName.trim()) {
      setError('Please enter a fruit name');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await axios.post(`${config.apiUrl}/api/fruits`, { name: fruitName });
      
      // Add the new fruit to the list
      setFruits([response.data, ...fruits]);
      setFruitName('');
      setSuccess(true);
      setSuccessMessage('Fruit added successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
      
      setLoading(false);
    } catch (err) {
      setError('Failed to add fruit');
      setLoading(false);
    }
  };

  // Handle fruit deletion
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      setError('');
      
      await axios.delete(`${config.apiUrl}/api/fruits/${id}`);
      
      // Remove the deleted fruit from the list
      setFruits(fruits.filter(fruit => fruit._id !== id));
      setSuccess(true);
      setSuccessMessage('Fruit removed successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
      
      setLoading(false);
    } catch (err) {
      setError('Failed to delete fruit');
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <header>
          <h1>🍎 Fruits Database 🍌</h1>
          <p className="subtitle">Add your favorite fruits to the collection</p>
        </header>

        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                value={fruitName}
                onChange={(e) => setFruitName(e.target.value)}
                placeholder="Enter fruit name..."
                className="fruit-input"
              />
              <button type="submit" className="add-button" disabled={loading}>
                {loading ? 'Adding...' : 'Add Fruit'}
              </button>
            </div>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{successMessage}</div>}
          </form>
        </div>

        <div className="fruits-container">
          <h2>Fruits Collection</h2>
          {loading && fruits.length === 0 ? (
            <div className="loading">Loading fruits...</div>
          ) : fruits.length === 0 ? (
            <div className="empty-message">No fruits in the database yet. Add some!</div>
          ) : (
            <ul className="fruits-list">
              {fruits.map((fruit) => (
                <li key={fruit._id} className="fruit-item">
                  <span className="fruit-emoji">🍉</span>
                  <span className="fruit-name">{fruit.name}</span>
                  <button 
                    className="remove-button" 
                    onClick={() => handleDelete(fruit._id)}
                    disabled={loading}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <footer>
        <p>Fruits Database App - Created with React & MongoDB</p>
      </footer>
    </div>
  );
}

export default App;