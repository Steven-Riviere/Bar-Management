import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const BiereCommande = sequelize.define('BiereCommande', {
    biere_id: {
        type: DataTypes.INTEGER,
    },

    commande_id: {
        type: DataTypes.INTEGER,
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },

    unit_price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, 
{ timestamps: false });

export default BiereCommande;
