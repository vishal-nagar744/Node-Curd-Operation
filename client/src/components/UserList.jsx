import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce';

function UserList() {
	const [users, setUsers] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
					params: { name: searchTerm, page: currentPage },
				});
				setUsers(response.data.users);
				setTotalPages(response.data.totalPages);
			} catch (error) {
				console.error('There was an error fetching the users!', error);
			}
		};

		fetchUsers();
	}, [searchTerm, currentPage]);

	const handleDelete = async id => {
		try {
			await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/delete/${id}`);
			setUsers(users.filter(user => user._id !== id));
		} catch (error) {
			console.error('There was an error deleting the user!', error);
		}
	};

	// Debounce the search input handler
	const debouncedSearch = useCallback(
		debounce(value => {
			setSearchTerm(value);
			setCurrentPage(1); // Reset to the first page on search
		}, 500), // 300ms debounce delay
		[]
	);

	const handleSearchChange = e => {
		debouncedSearch(e.target.value);
	};

	const handlePageChange = page => {
		if (page > 0 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	return (
		<div className="max-w-4xl mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4">User List</h2>
			<div className="mb-4">
				<input
					type="text"
					placeholder="Search by name"
					onChange={handleSearchChange}
					className="w-full px-3 py-2 border border-gray-300 rounded"
				/>
			</div>
			<Link to="/add" className="block bg-green-500 text-white px-3 py-2 rounded mb-4 hover:bg-green-700">
				Add User
			</Link>
			<ul>
				{users.map(user => (
					<li key={user._id} className="mb-4 p-4 bg-white rounded shadow-md flex justify-between items-center">
						<div>
							<p className="text-lg font-semibold">{user.name}</p>
							<p className="text-gray-600">{user.email}</p>
							<p className="text-gray-600">{user.age} years old</p>
						</div>
						<div>
							<Link to={`/edit/${user._id}`} className="text-blue-500 hover:text-blue-700 mr-2">
								Edit
							</Link>
							<button onClick={() => handleDelete(user._id)} className="text-red-500 hover:text-red-700">
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
			<div className="flex justify-between items-center mt-4">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
				>
					Previous
				</button>
				<span>
					Page {currentPage} of {totalPages}
				</span>
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
				>
					Next
				</button>
			</div>
		</div>
	);
}

export default UserList;
