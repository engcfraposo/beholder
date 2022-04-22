'use strict';
require("dotenv").config();
const bcrypt = require('bcryptjs');
const crypto = require('../src/utils/crypto.js');

module.exports = {
  async up (queryInterface, Sequelize) {
    if(false) {
      return queryInterface.bulkInsert('settings', [{
        email: process.env.EMAIL,
        password: bcrypt.hashSync(process.env.PASSWORD, 10),
        apiUrl: process.env.API_URL,
        accessKey: process.env.ACCESS_KEY,
        secretKey: crypto.encrypt(process.env.SECRET_KEY),
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
    }
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('settings', null, {});
  }
};
