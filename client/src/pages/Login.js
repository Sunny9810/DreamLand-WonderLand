import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import './styles/Login.css'

function Login(props) {
    //! intital local state and its update function are declared with useState hook
  const [formState, setFormState] = useState({ email: '', password: '' });
    //! useMutation points toward LOGIN mutation, with login function deconstructed
  const [login, { error }] = useMutation(LOGIN);

    //! submit form will start "login" mutation function
    //! sending the required variables from the local formState
    //! the mutationResponse will extract the token value
    //! and pass it to Auth.login function which saves it in localStorage
    //! and reroutes client to '/' home
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { 
          email: formState.email, 
          password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

    //! this function changes the values in formState 
    //! based on what input field is being typed in
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/signup" className='go-to-signup-link'>← Go to Signup</Link>

      <h2 className='login-heading'>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            className="input-field"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            className="input-field"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button type="submit" className='submit-btn'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
