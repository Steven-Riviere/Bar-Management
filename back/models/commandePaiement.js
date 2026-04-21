import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const CommandePaiement = sequelize.define("CommandePaiement", {
    commandeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    paiementId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    paid_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

export default CommandePaiement;
