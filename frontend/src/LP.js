import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LP = () => {
  // State to hold login data
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  // State to handle messages
  const [message, setMessage] = useState('');

  // Function to handle input changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  // Function to handle form submission
  const handleLoginsubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', loginData);

      // Assuming response contains a message key
      const { message } = response.data;
      setMessage(message); // Display the message from the server

    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || 'Something went wrong! Please try again later');
      } else {
        setMessage('Network Error: Unable to reach the server');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1>Login Page</h1>
      <form onSubmit={handleLoginsubmit} style={styles.form}>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={loginData.username}
          onChange={handleLoginChange}
          required
          style={styles.input}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={loginData.password}
          onChange={handleLoginChange}
          required
          style={styles.input}
        />
        <button type='submit' style={styles.button}>Login</button>
        <p>
          Not registered yet?{' '}
          <Link to='/registration'>Register Here</Link>
        </p>
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

// Styling for the page
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    borderRadius: '5px',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '10px',
    color: 'red', // Style error messages
  }
};

export default LP;
