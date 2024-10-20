import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AddUser from './components/AddUser';
import UserList from './components/UserList';
import EditUser from './components/EditUser';
import DeleteUser from './components/DeleteUser';
import Landing from './components/Landing/LandingPage';
import Navbar from './components/Navbar/Navbar';
import Signup from './components/Signup/SignUp';
import Login from './components/Signin/SignIn';
import ForgotPassword from './components/ForgotPassword/Forgot';
import ResetPassword from './components/ResetPassword/Reset';

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Navbar />
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/reset-password/:token" element={<ResetPassword />} />
					<Route
						path="/profile"
						element={
							<PrivateRoute>
								<UserList />
							</PrivateRoute>
						}
					/>
					<Route
						path="/add"
						element={
							<PrivateRoute>
								<AddUser />
							</PrivateRoute>
						}
					/>
					<Route
						path="/edit/:id"
						element={
							<PrivateRoute>
								<EditUser />
							</PrivateRoute>
						}
					/>
					<Route
						path="/delete/:id"
						element={
							<PrivateRoute>
								<DeleteUser />
							</PrivateRoute>
						}
					/>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
