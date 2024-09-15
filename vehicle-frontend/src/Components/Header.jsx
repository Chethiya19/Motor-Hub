import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiAdminFill } from "react-icons/ri";
import styles from './header.module.css'; // Ensure this path matches your CSS module file

export default function Header() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleadminClick = () => {
    navigate('/admin-login'); 
  };

  return (
    <div className={styles.header}>
      <div className={styles.title}>Motor Hub</div>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li><a href="" onClick={() => navigate('/')}>Home</a></li>
          <li><a href="" onClick={() => navigate('/VehicleAdds')}>Vehicle</a></li>
          <li><a href="" onClick={() => navigate('/prediction')}>Prediction</a></li>
          <li><a href="" onClick={() => navigate('/ImageUpload')}>Images</a></li>
          <li><a href="#about" onClick={() => navigate('/')}>About</a></li>
          <li><a href="#contact" onClick={() => navigate('/')} >Contact</a></li>
        </ul>
      </nav>
      <button onClick={handleRegisterClick} className={styles.registerButton}>Register</button>&nbsp;
      <button onClick={handleLoginClick} className={styles.loginButton}>Login</button>&nbsp;
      <div 
        onClick={handleadminClick} 
        style={{ cursor: 'pointer', color: '#f39c12' }} // Example color
      >
        <RiAdminFill size={30} />
      </div>
    </div>
  );
}
