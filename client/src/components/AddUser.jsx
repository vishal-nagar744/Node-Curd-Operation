import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddUser() {
	const navigate = useNavigate();
	const [user, setUser] = useState({ name: '', email: '', age: '' });

	const handleChange = e => {
		const { name, value } = e.target;
		setUser(prevState => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/add`, user);
			alert('User added successfully');
			navigate('/profile');
			setUser({ name: '', email: '', age: '' });
		} catch (error) {
			console.error(' error adding the user!', error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
			<h2 className="text-2xl font-bold mb-4">Add User</h2>
			<div className="mb-4">
				<label className="block text-gray-700">Name</label>
				<input
					type="text"
					name="name"
					value={user.name}
					onChange={handleChange}
					className="w-full px-3 py-2 border border-gray-300 rounded"
					required
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700">Email</label>
				<input
					type="email"
					name="email"
					value={user.email}
					onChange={handleChange}
					className="w-full px-3 py-2 border border-gray-300 rounded"
					required
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700">Age</label>
				<input
					type="number"
					name="age"
					value={user.age}
					onChange={handleChange}
					className="w-full px-3 py-2 border border-gray-300 rounded"
					required
				/>
			</div>
			<button type="submit" className="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700">
				Add User
			</button>
		</form>
	);
}

export default AddUser;
