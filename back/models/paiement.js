import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Paiement = sequelize.define("Paiement", {
    method: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    active : {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

export default Paiement;
