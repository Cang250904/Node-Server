const express = require('express');
const router = express.Router();

// Endpoint đăng nhập
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Kiểm tra thông tin đăng nhập (giả định để đơn giản)
  if (email === 'test@example.com' && password === 'password123') {
    return res.status(200).json({ message: 'Đăng nhập thành công' });
  } else {
    return res.status(401).json({ message: 'Thông tin đăng nhập không đúng' });
  }
});

module.exports = router;
