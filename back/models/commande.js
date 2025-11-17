import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import CommandePaiement from "./commandePaiement.js";

const Commande = sequelize.define('Commande',{
    name: {
        type: DataTypes.STRING,
    },

    price: {
        type: DataTypes.FLOAT,
    },

    bar_id: {
        type: DataTypes.INTEGER,
    },

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
Commande.belongsToMany(Paiement, { through: CommandePaiement });

export default Commande;