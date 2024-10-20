import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ResetPassword() {
	const { token } = useParams();
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async e => {
		e.preventDefault();
		setMessage('');
		setError('');

		if (password !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		try {
			const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/reset-password/${token}`, {
				password,
			});
			setMessage(response.data.message || 'Password reset successfully');
			navigate('/login');
		} catch (error) {
			console.error('Error resetting password:', error);
			setError(error.response?.data.message || 'Error resetting password.');
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-bold mb-4 text-center text-blue-500">Reset Password</h2>
				{message && <p className="mb-4 text-center text-green-500">{message}</p>}
				{error && <p className="mb-4 text-center text-red-500">{error}</p>}
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block mb-2 text-gray-700">New Password</label>
						<input
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block mb-2 text-gray-700">Confirm Password</label>
						<input
							type="password"
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<button type="submit" className="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700">
						Reset Password
					</button>
				</form>
			</div>
		</div>
	);
}

export default ResetPassword;
