import React, { useState } from 'react';
import MyBook from '../components/Hero';

const Homepage = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here
    console.log('Login:', loginEmail, loginPassword);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Perform signup logic here
    console.log('Signup:', signupEmail, signupPassword);
  };

  return (
    <div>
      <h1>Welcome to the DreamLand-WonderLand
      "Nights Full of Wonder: Baby PJ's for Dreamy Adventures!"
      </h1>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <div>
        <h2>Sign up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />
          <button type="submit">Sign up</button>
        </form>
        <div className="container">
      <MyBook />
    </div>
   </div>
     </div>
  )
}



export default Homepage;
