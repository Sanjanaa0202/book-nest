import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewPassword.css';

const NewPassword = () => {
  const [email, setemail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:6060/reset_password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email: email,
          newPassword: newPassword})
      });
      

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(result.user));
        setMessage("✅ Password reset successfully. Redirecting to login...");
 // Save user data
        setTimeout(() => navigate("/signin"), 2000);// Redirect
      } else {
        setMessage('❌ Login failed: ' + result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="new-password-container">
      <div className="new-password-form">
        <h2>Update Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Enter your email'
              value={email}
              onChange={(e)=>setemail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='Enter new password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder='Confirm new password'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div> */}
          <button type="submit" className="change-password-btn">
            Change Password
          </button>
        </form>

        {message && <div className="text-center mt-3 fw-bold">{message}</div>}
      </div>
    </div>
  );
};

export default NewPassword;