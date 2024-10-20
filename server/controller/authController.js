const User = require('../models/authUserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const register = async (req, res) => {
	try {
		const { firstname, lastname, email, password } = req.body;
		if (!(firstname && lastname && email && password)) {
			return res.status(400).send('All Fields Are Required');
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).send('User Already Exists With This Email');
		}

		const encryptedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			firstname,
			lastname,
			email,
			password: encryptedPassword,
		});

		const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, { expiresIn: '2h' });

		user.password = undefined;

		res.status(201).json({ user, token });
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!(email && password)) {
			return res.status(400).send('Send All Data');
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).send('User not found');
		}

		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

			user.password = undefined;

			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};

			return res.status(200).cookie('token', token, options).json({
				success: true,
				token,
				user,
			});
		}

		res.status(400).send('Invalid Credentials');
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};

const logout = (req, res) => {
	res.clearCookie('token').send('Logged out successfully');
};

const profile = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		if (!user) {
			return res.status(404).send('User not found');
		}
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};

const forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;
		if (!email) {
			return res.status(400).send('Email is required');
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).send('User not found');
		}

		const token = crypto.randomBytes(20).toString('hex');

		user.resetPasswordToken = token;
		user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
		await user.save();

		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.EMAIL,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		const mailOptions = {
			from: process.env.EMAIL,
			to: user.email,
			subject: 'Password Reset',
			text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            ${process.env.FRONT_URL}/reset-password/${token}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,
		};

		transporter.sendMail(mailOptions, (err, response) => {
			if (err) {
				console.error('There was an error sending the email:', err);
				res.status(500).send('Error sending reset link.');
			} else {
				res.status(200).send('Reset link sent successfully.');
			}
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};

const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		console.log(`Received reset password request for token: ${token}`);

		if (!token) {
			console.error('Token is required');
			return res.status(400).json({ message: 'Token is required' });
		}

		if (!password) {
			console.error('Password is required');
			return res.status(400).json({ message: 'Password is required' });
		}

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpires: { $gt: Date.now() },
		});

		if (!user) {
			console.error('Invalid or expired token');
			return res.status(400).json({ message: 'Invalid or expired token' });
		}

		const encryptedPassword = await bcrypt.hash(password, 10);

		user.password = encryptedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpires = undefined;

		await user.save();

		console.log('Password reset successfully for user:', user.email);

		res.status(200).json({ message: 'Password reset successfully' });
	} catch (error) {
		console.error('Error resetting password:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

module.exports = {
	register,
	login,
	logout,
	profile,
	forgotPassword,
	resetPassword,
};
