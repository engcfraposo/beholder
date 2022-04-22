'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('symbols', [{
        symbol: 'BTCUSD',
        basePrecision: 8,
        quotePrecision: 8,
        minNotional: '0.1',
        minLotSize: '0.1',
        isFavorite: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
  },

  async down (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('symbols', null, {});
  }
};
