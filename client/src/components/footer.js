import React, { useEffect, useState } from 'react';

const styles = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '1rem'
}

export default function Footer() {
  return (
    <footer style={styles} classname="footer">
      <p>"This is a footer for the website."</p>
    </footer>
  );
}