import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const StockMovement = sequelize.define('StockMovement', {
    type: {
        type: DataTypes.ENUM("IN", "OUT", "TRANSFERT"),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
        min: 1,
        },
    },

    biere_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    from_bar_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    to_bar_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

}, {
  timestamps: true,
});

export default StockMovement;