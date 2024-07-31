import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import authService from '../appwrite/auth'; // Ensure this path is correct

const ResetPasswordPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userId, setUserId] = useState('');
    const [secret, setSecret] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Extract userId and secret from the URL
        const queryParams = new URLSearchParams(location.search);
        const userIdParam = queryParams.get('userId');
        const secretParam = queryParams.get('secret');
        
        if (userIdParam && secretParam) {
            setUserId(userIdParam);
            setSecret(secretParam);
        } else {
            setMessage('Invalid reset token or user ID.');
        }
    }, [location.search]);

    const handlePasswordReset = async () => {
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }
        try {
            // Call completePasswordReset with userId, secret, and newPassword
            await authService.completePasswordReset(userId, secret, newPassword);
            setMessage('Password reset successfully.');
            navigate('/login'); // Redirect to login page
        } catch (err) {
            console.error('Error resetting password:', err);
            setMessage('Failed to reset password.');
        }
    };

    return (
        <div className="flex items-center justify-center w-full p-4">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <h2 className="text-center text-3xl font-semibold leading-tight">Reset Password</h2>
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border rounded-md p-2 w-full mt-4"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border rounded-md p-2 w-full mt-4"
                />
                <button
                    onClick={handlePasswordReset}
                    className="bg-green-500 text-white p-2 rounded-md mt-4 w-full"
                >
                    Reset Password
                </button>
                {message && <p className="text-center mt-4">{message}</p>}
            </div>
        </div>
    );
};

export default ResetPasswordPage;
