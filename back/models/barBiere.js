import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const BarBiere = sequelize.define('BarBiere', {
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },

  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },

  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

  disabled_at: DataTypes.DATE,
  disabled_by: DataTypes.INTEGER

}, {
  timestamps: true,
});

export default BarBiere;