'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addIndex('settings', ['email'], {
      name: 'settings_emails_index',
      unique: true,
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeIndex('settings', 'settings_emails_index')
  }
};
