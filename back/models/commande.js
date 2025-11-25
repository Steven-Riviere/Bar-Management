import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Commande = sequelize.define('Commande',{
    price: DataTypes.FLOAT,
    bar_id: DataTypes.INTEGER,
    table_id : DataTypes.INTEGER,
    date: {
        type: DataTypes.DATEONLY, // Utilisation de DATEONLY pour stocker uniquement la date sans l'heure
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM,
        values: ['en cours', 'fini'],
        allowNull: false,
        defaultValue: 'en cours',
    }
});

export default Commande;