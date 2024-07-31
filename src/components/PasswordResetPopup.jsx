import React, { useState } from 'react';
import authService from '../appwrite/auth';

const PasswordResetPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSendResetEmail = async () => {
    setMessage(''); // Clear previous messages
    try {
      await authService.sendPasswordReset(email);
      setEmailSent(true); // Set emailSent to true after successful email sending
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (err) {
      console.error('Error sending password reset email:', err);
      setMessage('Failed to send password reset email.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white p-8 rounded-lg w-full max-w-sm">
        {emailSent ? (
          <div>
            <h3 className="text-xl font-semibold">Email Sent</h3>
            <p className="mt-2">{message}</p>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold">Reset Password</h3>
            <p className="mt-2">Enter your email to receive a password reset link.</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-md p-2 w-full mt-4"
            />
            <button
              onClick={handleSendResetEmail}
              className="bg-blue-500 text-white p-2 rounded-md mt-4 w-full"
            >
              Send Password Reset Email
            </button>
            {message && <p className="text-center mt-4">{message}</p>}
          </div>
        )}
        <button
          onClick={onClose}
          className="text-blue-500 mt-4 w-full text-center"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PasswordResetPopup;
