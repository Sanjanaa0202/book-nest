import React from 'react'
import './Signup.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handlechange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked ? value : '' }));
    }

    const handlesubmit = async (e) => {
    e.preventDefault();
    setMessage("handling submit");
    console.log(formData,"data to be sent to server")

    try {
      const response = await fetch("http://localhost:6060/upload", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
         },
        body: JSON.stringify(formData)
      });

      // Log the response status and text for debugging
    console.log("Response status:", response.status);
    const responseText = await response.text();
    console.log("Response text:", responseText);

      let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      setMessage("❌ Server returned invalid response");
      return;
    }

      if (response.ok) {
        setMessage("✅ Registered Successfully!");
        setTimeout(() => {
          setMessage("Thank you for registering! You can now log in.");
        }, 10000); // Clear message after 10 seconds
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        });
        navigate('/signin'); // Redirect to login page after successful registration
      }
      else {
        setMessage(`❌ Registration Failed: ${result.message || "Unknown error"}`);
      }
    }
    catch (error) {
      console.error("Error during registration:", error);
    setMessage(`❌ Registration Failed: ${error.message}`);
    }
}

  return (
    <div className='signup'>
      <section class="signup-section">
        <div class="container">
            <div class="signup-container">
                <div class="signup-image">
                    <h2>Join Our Reading Community</h2>
                    <p>Create an account to start renting books and building your reading wishlist today.</p>
                </div>
                <div class="signup-form-container">
                    <h2>Create Account</h2>
                    <p>Fill in your details to get started with BookNest.</p>
                    
                    <form onSubmit={handlesubmit}>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="first-name">First Name</label>
                                <input type="text" id="firstName" placeholder="Enter your first name" onChange={handlechange} value={formData.firstName} required/>
                            </div>
                            <div class="form-group">
                                <label for="last-name">Last Name</label>
                                <input type="text" id="lastName" placeholder="Enter your last name" onChange={handlechange} value={formData.lastName} required/>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" id="email" placeholder="Enter your email" onChange={handlechange} value={formData.email} required/>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" id="password" placeholder="Create a password" onChange={handlechange} value={formData.password} required/>
                            </div>
                            {/* <div class="form-group">
                                <label for="confirm-password">Confirm Password</label>
                                <input type="password" id="confirm-password" placeholder="Confirm your password" required/>
                            </div> */}
                        </div>
                        
                        {/* <div class="form-group">
                            <label for="reading-preference">Reading Preference</label>
                            <select id="reading-preference">
                                <option value="">Select your favorite genre</option>
                                <option value="fiction">Fiction</option>
                                <option value="mystery">Mystery & Thriller</option>
                                <option value="scifi">Science Fiction & Fantasy</option>
                                <option value="biography">Biographies & Memoirs</option>
                                <option value="history">History</option>
                                <option value="selfhelp">Self-Help</option>
                            </select>
                        </div> */}
                        
                        <div class="terms-conditions">
                            <input type="checkbox" id="terms" required/>
                            <label for="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
                        </div>
                        
                        <button type="submit" class="btn signup-btn">Create Account</button>
                    </form>
                    
                    <div class="login-link">
                        <p>Already have an account? <Link to='/signin'>Sign in here</Link></p>
                    </div>

                    {message && <div className="text-center mt-3 fw-bold">{message}</div>}
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default Signup
