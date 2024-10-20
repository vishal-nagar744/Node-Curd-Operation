import React, { useState } from 'react';
import axios from 'axios';

function DeleteUser() {
	const [email, setEmail] = useState('');

	const handleChange = e => {
		setEmail(e.target.value);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/delete`, { email });
			alert('User deleted successfully');
			setEmail('');
		} catch (error) {
			console.error('Error deleting the user!', error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
			<h2 className="text-2xl font-bold mb-4">Delete User</h2>
			<div className="mb-4">
				<label className="block text-gray-700">Email</label>
				<input
					type="email"
					name="email"
					value={email}
					onChange={handleChange}
					className="w-full px-3 py-2 border border-gray-300 rounded"
					required
				/>
			</div>
			<button type="submit" className="w-full bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700">
				Delete User
			</button>
		</form>
	);
}

export default DeleteUser;
