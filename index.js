const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/flutter_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Định nghĩa schema
const userSchema = new mongoose.Schema({
  full_name: String,
  email: String,
  password: String,
  phone_number: String,
  address: String,
  country: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

// API
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Người dùng không tồn tại' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'Người dùng không tồn tại' });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'Người dùng không tồn tại' });
    res.json({ message: 'Người dùng đã được xóa thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/users/search', async (req, res) => {
  try {
    const keyword = req.query.q;
    const users = await User.find({
      $or: [
        { full_name: { $regex: keyword, $options: 'i' } },
        { email: { $regex: keyword, $options: 'i' } },
        { phone_number: { $regex: keyword, $options: 'i' } },
      ],
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/users/paginate', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await User.countDocuments();
    const users = await User.find().skip(skip).limit(limit);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      users,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: 'Thông tin đăng nhập không chính xác' });
    res.json({ message: 'Đăng nhập thành công', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/users/stats', async (req, res) => {
  try {
    const stats = await User.aggregate([
      { $group: { _id: '$country', count: { $sum: 1 } } },
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Chạy server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
