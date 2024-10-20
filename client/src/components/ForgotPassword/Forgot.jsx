import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			alert('Email Send Successfully');
			const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/forgot-password`, {
				email,
			});
			setMessage(response.data.message);
		} catch (error) {
			console.error('There was an error sending the reset link!', error);
			setMessage('Error sending reset link.');
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-bold mb-4 text-center text-blue-500">Forgot Password</h2>
				{message && <p className="mb-4 text-center text-red-500">{message}</p>}
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block mb-2 text-gray-700">Email</label>
						<input
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<button type="submit" className="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700">
						Send Reset Link
					</button>
				</form>
			</div>
		</div>
	);
}

export default ForgotPassword;
