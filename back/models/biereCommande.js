import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const BiereCommande = sequelize.define('BiereCommande', {
    biereId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    commandeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    unitPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    }
}, {
    timestamps: false
});

export default BiereCommande;