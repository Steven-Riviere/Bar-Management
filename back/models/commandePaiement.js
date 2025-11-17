import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const CommandePaiement = sequelize.define("CommandePaiement", {
    commande_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    paiement_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

export default CommandePaiement;
