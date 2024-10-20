import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			axios
				.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`)
				.then(response => {
					setUser(response.data);
					setLoading(false);
				})
				.catch(() => {
					localStorage.removeItem('token');
					setLoading(false);
				});
		} else {
			setLoading(false);
		}
	}, []);

	const login = async (email, password) => {
		const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
			email,
			password,
		});
		const { token, user } = response.data;
		localStorage.setItem('token', token);
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		setUser(user);
		navigate('/profile');
	};

	const register = async (firstname, lastname, email, password) => {
		await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
			firstname,
			lastname,
			email,
			password,
		});
		navigate('/login');
	};

	const logout = () => {
		localStorage.removeItem('token');
		delete axios.defaults.headers.common['Authorization'];
		setUser(null);
		navigate('/login');
	};

	return (
		<AuthContext.Provider value={{ user, login, register, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
