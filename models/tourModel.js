const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

// Định nghĩa model Tour với Sequelize
const Tour = sequelize.define('Tour', {
  cityName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  days: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'Tour',
  timestamps: false  // Nếu không muốn sử dụng cột createdAt và updatedAt
});

module.exports = Tour;