// src/components/Home.js
import React from 'react';
import styles from './home.module.css';

import '@fortawesome/fontawesome-free/css/all.min.css';


import Header from './Header';
import Footer from './Footer';

const Home = () => {
  return (
    <>
      <Header />
      <div>
      <section id="home" className={styles.home}>
          <div className={styles.banner}>
            <div className={styles.content}>
              <h2 className={styles.title}>Web Application for Vehicle Price Prediction</h2>
              <p className={styles.description}>
                Accurate vehicle price predictions to help you make informed buying and selling decisions.
              </p>
              <a href="prediction" className={styles.getStartedBtn}>Get Started</a>
            </div>
          </div>
        </section>

        {/* New Gallery Section */}
        <section id="gallery" className={styles.gallery}>
          <h3 className={styles.sectionTitle}>Gallery</h3>
          <div className={styles.galleryRow}>
            <div className={`${styles.galleryItem} ${styles.item1}`}>
              <p className={styles.galleryCaption}>Luxury Sedan</p>
            </div>
            <div className={`${styles.galleryItem} ${styles.item2}`}>
              <p className={styles.galleryCaption}>New Bikes</p>
            </div>
            <div className={`${styles.galleryItem} ${styles.item3}`}>
              <p className={styles.galleryCaption}>Electric SUV</p>
            </div>
          </div>
        </section>

        
        <section id="about" className={`${styles.about} py-5 bg-light`}>
          <div className="container">
            <h2 className="text-center mb-4">About Us</h2>
            <div className="row">
              <div className="col-md-6">
                <div className={styles.aboutImage}></div>
              </div>
              <div className="col-md-6">
                <p>We are a team of automotive enthusiasts and data scientists dedicated to providing accurate vehicle price predictions. Our mission is to empower buyers, sellers, and dealers with reliable data to make smarter decisions in the vehicle market.</p>
                <p>Our vehicle price prediction tool utilizes advanced machine learning algorithms to analyze a wide range of factors, including make, model, year, mileage, and more. By combining comprehensive market data with cutting-edge technology, we deliver price estimates you can trust.</p>
                <p>Whether you're buying, selling, or trading a vehicle, our platform is designed to meet your needs. Trust our expertise to guide you in understanding the true value of your vehicle.</p>
              </div>
            </div>
          </div>
        </section>

        
        <section id="contact" className={`${styles.contact} py-5`}>
          <div className="container">
            <h2 className="text-center mb-4">Contact Us</h2>
            <p className="text-center">Have questions or need support? Reach out to us for assistance with our vehicle price prediction tool.</p>
            <div className="row">
              <div className="col-md-5">
                <h4>Contact Details</h4>
                <ul className="list-unstyled">
                  <li><i className="fas fa-map-marker-alt"></i> <strong>Address:</strong> 456 Auto Market Blvd, City, Country</li>
                  <li><i className="fas fa-phone"></i> <strong>Phone:</strong> +1 (987) 654-3210</li>
                  <li><i className="fas fa-envelope"></i> <strong>Email:</strong> support@vehiclepricepredictor.com</li>
                  <li><i className="fas fa-clock"></i> <strong>Working Hours:</strong> Mon - Fri, 9:00 AM - 5:00 PM</li>
                </ul>
                <h4>Follow Us</h4>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <a href="https://facebook.com" className="text-dark"><i className="fab fa-facebook fa-2x"></i></a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://twitter.com" className="text-dark"><i className="fab fa-twitter fa-2x"></i></a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://linkedin.com" className="text-dark"><i className="fab fa-linkedin fa-2x"></i></a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://instagram.com" className="text-dark"><i className="fab fa-instagram fa-2x"></i>
                  </a>
                </li>
                </ul>
              </div>
              <div className="col-md-7">
                <form action="/contact" method="post" className={styles.contactForm}>
                  <div className="form-group">
                    <label htmlFor="name">Your Name:</label>
                    <input type="text" id="name" name="name" className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Your Email:</label>
                    <input type="email" id="email" name="email" className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Your Message:</label>
                    <textarea id="message" name="message" className="form-control" rows="5" required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default Home;
