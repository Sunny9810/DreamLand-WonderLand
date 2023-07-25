import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import './styles/Signup.css'

function Signup(props) {
    //! local state for this component is declared, "formState" intital state including two empty fields for email and password, and 'setFormState' to update it
  const [formState, setFormState] = useState({ email: '', password: '', firstName: '', lastName: '' });
    //! mutation is declared to add user
  const [addUser, { error }] = useMutation(ADD_USER);

    //! form submit handler function that will do the addUser mutation with the formState values as the payload,
    //! when response from database is recieved, the token is extracted,
    //! and passed into Auth.login, which will store in localStorage and reroute to '/' home
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try{
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
    }
    catch (e) {
      console.log(e);
    }
  };

    //! input change handle function, 
    //! will take the 'name' of the input field where event is happening 
    //! and 'value' of input, so email input will take 'name' = email and value of string typed
    //! then updating the formStates value where specified field matches '[name]', either email or password field in formState
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/login" className="go-to-login-link">← Login</Link>

      
      <form onSubmit={handleFormSubmit}>
      <h2 className="signup-heading">Signup</h2>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">First Name:</label>
          <input
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            className="input-field"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="lastName">Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            className="input-field"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
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

export default Signup;

//* Sign Up Component summary
//! component handles user signup functionality. 
//! It includes a form with various input fields for collecting user information. 
//! The form submission triggers a mutation to add the user, 
//! and the user is then logged in using the generated token. 
//! Input changes are handled to update the form state. 
//! The component also includes navigation links and styling for the signup form.