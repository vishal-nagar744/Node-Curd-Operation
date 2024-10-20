import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditUser() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [user, setUser] = useState({ name: '', email: '', age: '' });

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`);
				setUser({ name: response.data.name, email: response.data.email, age: response.data.age });
				console.log(response.data);
			} catch (error) {
				console.error('There was an error fetching the user!', error);
			}
		};

		fetchUser();
	}, [id]);

	const handleChange = e => {
		const { name, value } = e.target;
		setUser(prevState => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/edit/${id}`, user);
			alert('User updated successfully');
			navigate('/profile');
		} catch (error) {
			console.error('There was an error updating the user!', error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md mt-40">
			<h2 className="text-2xl font-bold mb-4">Edit User</h2>
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
					// placeholder={user.email}
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
				Update User
			</button>
		</form>
	);
}

export default EditUser;
