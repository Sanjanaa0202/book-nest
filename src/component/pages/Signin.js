import React from 'react'
import './Signin.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaGoogle, FaFacebookF, FaTwitter } from 'react-icons/fa';

const Signin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:6060/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(result.user));
        console.log("login user",result) // Save user data
        navigate("/home"); // Redirect
      } else {
        setMessage('❌ Login failed: ' + result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("❌ Server error");
    }
  };

  return (
    <div className='signin'>
      <section class="signin-section">
        <div class="container">
            <div class="signin-container">
                <div class="signin-image">
                    <h2>Welcome Back!</h2>
                    <p>Sign in to continue your reading journey and access your personalized book recommendations.</p>
                </div>
                <div class="signin-form-container">
                    <h2>Sign In</h2>
                    <p>Access your BookNest account to manage your rentals and wishlist.</p>
                    
                    <form onSubmit={handleSubmit}>
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" id="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required/>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div class="remember-forgot">
                            <div class="remember-me">
                                <input type="checkbox" id="remember" />
                                <label for="remember">Remember me</label>
                            </div>
                            <div class="forgot-password">
                                <Link to={'/new_password'}>Forgot password?</Link>
                            </div>
                        </div>
                        <button type="submit" class="btn signin-btn">Sign In</button>
                    </form>
                    
                    <div class="social-signin">
                        <p>Or sign in with</p>
                        <div className="social-icons">
                            <a href="#" className="social-icon">
                                <FaGoogle />
                            </a>
                            <a href="#" className="social-icon">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="social-icon">
                                <FaTwitter />
                            </a>
                        </div>
                    </div>
                    
                    <div class="signup-link">
                        <p>Don't have an account? <Link to='/signup'>Sign up here</Link></p>
                    </div>

                    {message && <div className="text-center mt-3 fw-bold">{message}</div>}   
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default Signin
