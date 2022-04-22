import * as Sequelize from 'sequelize';
import db from '../database';

const Symbol = db.define('symbols', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  basePrecision: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quotePrecision: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  minNotional: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  minLotSize: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isFavorite: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

export default Symbol;