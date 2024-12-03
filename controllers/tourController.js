const Tour = require('../models/tourModel');

// Lấy tất cả các tour
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.findAll();  // Lấy tất cả dữ liệu từ bảng Tour
    res.json(tours);
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu:', err);
    res.status(500).json({ error: 'Lỗi khi lấy dữ liệu' });
  }
};

// Thêm tour mới
exports.createTour = async (req, res) => {
  const { cityName, days, price, avatar } = req.body;

  try {
    const newTour = await Tour.create({
      cityName,
      days,
      price,
      avatar
    });
    res.status(201).json(newTour);  // Trả về dữ liệu tour vừa tạo
  } catch (err) {
    console.error('Lỗi khi thêm dữ liệu:', err);
    res.status(500).json({ error: 'Lỗi khi thêm dữ liệu' });
  }
};

// Cập nhật tour theo ID
exports.updateTour = async (req, res) => {
  const { id } = req.params;
  const { cityName, days, price, avatar } = req.body;

  try {
    const tour = await Tour.findByPk(id);

    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }

    tour.cityName = cityName || tour.cityName;
    tour.days = days || tour.days;
    tour.price = price || tour.price;
    tour.avatar = avatar || tour.avatar;

    await tour.save();

    res.json(tour);
  } catch (err) {
    console.error('Error updating tour:', err);
    res.status(500).json({ error: 'Error updating tour' });
  }
};