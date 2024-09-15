// src/components/Footer.jsx
import React from 'react';
import styles from './footer.module.css'; // Ensure this path matches your CSS module file

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>© 2024 Motor Hub Vehicle Price Prediction Web App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
