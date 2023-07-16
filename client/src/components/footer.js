import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>This is a footer for the website.</p>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '1rem',
};

export default Footer;