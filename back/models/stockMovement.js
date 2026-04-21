import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const StockMovement = sequelize.define('StockMovement', {
  type: {
    type: DataTypes.ENUM("IN", "OUT", "TRANSFER"),
    allowNull: false,
  },

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 }
  },

  biereId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  fromBarId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  toBarId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },


  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  reason: {
    type: DataTypes.ENUM(
      "SALE",        // commande
      "RESTOCK",     // réappro
      "TRANSFER",
      "LOSS",        // casse / perte
      "ADJUSTMENT"   // correction manuelle
    ),
    allowNull: false,
    defaultValue: "ADJUSTMENT"
  },

  sourceType: {
    type: DataTypes.STRING,
    allowNull: true
  },

  sourceId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }

}, {
  timestamps: true,
  indexes: [
    { fields: ["biereId"] },
    { fields: ["fromBarId"] },
    { fields: ["toBarId"] },
    { fields: ["createdAt"] }
  ]
});

export default StockMovement;