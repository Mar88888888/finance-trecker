import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../styles/HomePage.css';

const HomePage = () => {
  const { authToken, user, setUser, setAuthToken } = useContext(AuthContext); 
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
   const fetchTransactions = async () => {
      try {
        const transactionsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/transactions`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setTransactions(transactionsResponse.data.slice(0, 10));
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setAuthToken(null); 
          setUser(null);       
          navigate('/login');
        } else {
          setError('Failed to load transactions.');
          setLoading(false);
        }
      }
    };

    if (user) {
      fetchTransactions();
    } else {
      setLoading(false); 
    }  }, [user, authToken]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="homepage-container">
      {user ? (
        <>
          <h1>Welcome back, {user.name}!</h1>
          <div className="transactions-section">
            <h2>Recent Transactions</h2>
            <ul>
              {transactions.map(transaction => (
                <li key={transaction.id} className="transaction-item">
                  <div>{transaction.purpose.category}</div>
                  <div>${transaction.sum.toFixed(2)}</div>
                  <div>{new Date(transaction.date).toLocaleDateString()}</div>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="info-section">
          <h1>Welcome to Finance Tracker</h1>
          <p>Our app helps you effortlessly track your expenses and income, so you can focus on reaching your financial goals.</p>
          <ul>
            <li>Monitor all your transactions in one place</li>
            <li>Gain insights into your spending patterns</li>
            <li>Set and achieve your financial targets</li>
            <li>Secure, user-friendly, and free to use</li>
          </ul>
          <p><strong><Link to="/signup">Sign up</Link></strong> or <strong><Link to="/login">Log In</Link></strong> to get started!</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
