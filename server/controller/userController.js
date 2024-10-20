const User = require('../models/userModel');

// Get all users or search users by name with pagination
exports.getAllUsers = async (req, res) => {
  try {
      const { name, page = 1, limit = 4 } = req.query;
      const query = name ? { name: { $regex: name, $options: 'i' } } : {};

      const users = await User.find(query)
          .limit(limit * 1) // Convert limit to number
          .skip((page - 1) * limit)
          .exec();

      const count = await User.countDocuments(query);

      res.status(200).json({
          users,
          totalPages: Math.ceil(count / limit),
          currentPage: Number(page),
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


//Get User by id:
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Create user
exports.createUser = async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { name, email, age }, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

