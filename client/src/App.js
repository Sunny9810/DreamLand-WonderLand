import React from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import MyBook from './components/Hero';

function App() {
  return (
    <div>
      <Header />
      <MyBook />
      <Footer />
      </div>
  );
}

export default App;