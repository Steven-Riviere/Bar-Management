import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import CommandePaiement from "./commandePaiement.js";

const Paiement = sequelize.define('Paiement', {
    method: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Paiement.belongsToMany(Commande, { through: CommandePaiement });
export default Paiement;
