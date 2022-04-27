'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('settings', 'streamUrl', {
      type: Sequelize.STRING
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('settings', 'streamUrl');
  }
};
