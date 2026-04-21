import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Commande = sequelize.define('Commande',{
    price: DataTypes.FLOAT,
    tableId : DataTypes.INTEGER,
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM,
        values: ['en cours', 'fini'],
        allowNull: false,
        defaultValue: 'en cours',
    }
});

export default Commande;