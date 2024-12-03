const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/config'); // Nhớ đảm bảo sequelize được xuất đúng cách từ config

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
  },
  user_type: {
    type: DataTypes.ENUM('Traveler', 'Guide'),
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
  },
  language_spoken: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  avatar: {
    type: DataTypes.STRING,
  },
  created_at: {
    type: DataTypes.STRING,
  },
  updated_at: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'User',
  timestamps: true, // Điều này sẽ tự động thêm `createdAt` và `updatedAt`
  createdAt: 'created_at', // Đổi tên createdAt thành created_at
  updatedAt: 'updated_at', // Đổi tên updatedAt thành updated_at
});

module.exports = User;