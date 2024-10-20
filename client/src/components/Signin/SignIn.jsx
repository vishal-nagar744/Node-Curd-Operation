import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState(null);
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async e => {
		e.preventDefault();
		setError(null);
		try {
			await login(email, password);
		} catch (error) {
			setError('There was an error logging in!');
		}
	};

	const handleForgotPassword = () => {
		navigate('/forgot-password');
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-bold mb-4 text-center text-blue-500">Login</h2>
				{error && <div className="bg-red-500 text-white p-2 mb-4 rounded">{error}</div>}
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
					<div className="mb-6 relative">
						<label className="block mb-2 text-gray-700">Password</label>
						<input
							type={showPassword ? 'text' : 'password'}
							value={password}
							onChange={e => setPassword(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500 focus:outline-none mt-8"
						>
							{showPassword ? (
								<svg
									fill="#000000"
									height="20px"
									width="20px"
									version="1.1"
									id="Capa_1"
									xmlns="http://www.w3.org/2000/svg"
									xmlns:xlink="http://www.w3.org/1999/xlink"
									viewBox="0 0 612 612"
									xml:space="preserve"
								>
									<g>
										<g>
											<path
												d="M609.608,315.426c3.19-5.874,3.19-12.979,0-18.853c-58.464-107.643-172.5-180.72-303.607-180.72
			S60.857,188.931,2.393,296.573c-3.19,5.874-3.19,12.979,0,18.853C60.858,423.069,174.892,496.147,306,496.147
			S551.143,423.069,609.608,315.426z M306,451.855c-80.554,0-145.855-65.302-145.855-145.855S225.446,160.144,306,160.144
			S451.856,225.446,451.856,306S386.554,451.855,306,451.855z"
											/>
											<path
												d="M306,231.67c-6.136,0-12.095,0.749-17.798,2.15c5.841,6.76,9.383,15.563,9.383,25.198c0,21.3-17.267,38.568-38.568,38.568
			c-9.635,0-18.438-3.541-25.198-9.383c-1.401,5.703-2.15,11.662-2.15,17.798c0,41.052,33.279,74.33,74.33,74.33
			s74.33-33.279,74.33-74.33S347.052,231.67,306,231.67z"
											/>
										</g>
									</g>
								</svg>
							) : (
								<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M2 2L22 22" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
									<path
										d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335"
										stroke="#000000"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818"
										stroke="#000000"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							)}
						</button>
					</div>
					<button type="submit" className="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700">
						Login
					</button>
				</form>
				<div className="flex justify-between mt-4">
					<Link to="/forgot-password" className="text-blue-500 hover:underline">
						Forgot Password
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
