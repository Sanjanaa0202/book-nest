import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='footer'>
        <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h3>BookNest</h3>
                    <p>Your cozy nest for temporary book companions. Read more, spend less, live better.</p>
                    <div className="social-links">
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaPinterest /></a>
                    </div>
                </div>
                <div class="footer-col">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to='/home'>Home</Link></li>
                        <li><Link to='/books'>Browse Books</Link></li>
                        <li><Link href="#">About</Link></li>
                        <li><Link href="#">Contact</Link></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>Categories</h3>
                    <ul>
                        <li><a href="#">Fiction</a></li>
                        <li><a href="#">Mystery & Thriller</a></li>
                        <li><a href="#">Science Fiction</a></li>
                        <li><a href="#">Fantasy</a></li>
                        <li><a href="#">Biographies</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>Contact Us</h3>
                    <ul>
                        <li><i class="fas fa-map-marker-alt"></i> 123 Book Street, Mumbai, India</li>
                        <li><i class="fas fa-phone"></i> +91 12345 67890</li>
                        <li><i class="fas fa-envelope"></i> hello@booknest.com</li>
                    </ul>
                </div>
            </div>
            <div class="copyright">
                <p>&copy; 2023 BookNest. All rights reserved.</p>
            </div>
        </div>
    </footer>
    </div>
  )
}

export default Footer
