// Import các thư viện cần thiết
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');

// Cấu hình chung cho cơ sở dữ liệu và server
const config = {
  database: {
    name: 'tour',
    username: 'root',
    password: '',
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log
  },
  server: {
    port: 5000
  }
};


// Khởi tạo Express app và Sequelize instance
const app = express();
app.use(bodyParser.json());

const sequelize = new Sequelize(
  config.database.name,
  config.database.username,
  config.database.password,
  {
    host: config.database.host,
    dialect: config.database.dialect,
  }
);

// Kiểm tra kết nối cơ sở dữ liệu
sequelize.authenticate()
  .then(() => {
    console.log('Kết nối thành công với cơ sở dữ liệu MySQL');
  })
  .catch(err => {
    console.error('Lỗi kết nối:', err);
  });

module.exports = { app, sequelize, config };