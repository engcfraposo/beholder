'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('settings', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apiUrl: Sequelize.STRING,
      accessKey: Sequelize.STRING,
      secretKey: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    }, {
      indexes: [{
        fields: ['email'],
        unique: true,
      }]
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('settings');
  }
};
