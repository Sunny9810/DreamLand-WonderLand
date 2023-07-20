import React, { useState } from 'react';
// import MyBook from '../components/Book/Hero';
import Nav from '../components/Nav';
import './styles/homepage.css'

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
        <h2 className='login'>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button type="submit" className='lbtn'>Login</button>
        </form>
      </div>
      <div>
        <h2 className='sign-up'>Sign up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />
          <button type="submit" className='btn'>Sign up</button>
        </form>
        <div className="container">
        <Nav />
      {/* <MyBook /> */}
      
    </div>
   </div>
     </div>
  )
}



export default Homepage;
