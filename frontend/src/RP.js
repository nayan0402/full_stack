import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegistrationPage = () => {
  // State to hold registration data
  const [registerData, setRegisterData] = useState({
    username: '',
    password: ''
  });

  // State to handle success and error messages
  const [message, setMessage] = useState('');

  // Function to handle input changes
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
  };

  // Function to handle form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/registration', registerData);
      
      const {message} = response.data;
      setMessage(message);
    } catch (error) {
        setMessage(`Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Registration Page</h1>
      <form onSubmit={handleRegisterSubmit} style={styles.form}>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={registerData.username}
          onChange={handleRegisterChange}
          required
          style={styles.input}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={registerData.password}
          onChange={handleRegisterChange}
          required
          style={styles.input}
        />
        <button type='submit' style={styles.button}>Register</button>
        <p>
          Already registered? <Link to='/login'>Login Here</Link>
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
    backgroundColor: '#007bff',
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

export default RegistrationPage;
