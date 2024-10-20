const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			return res.status(403).json({ message: 'Please log in first' });
		}

		const token = authHeader.split(' ')[1];
		if (!token) {
			return res.status(403).json({ message: 'Please log in first' });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		console.error('Token verification error:', error.message);
		return res.status(401).json({ message: 'Invalid token' });
	}
};

module.exports = auth;
