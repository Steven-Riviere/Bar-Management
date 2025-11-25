import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Paiement = sequelize.define('Paiement', {
    method: {
        type: DataTypes.ENUM('CB', 'Espèces', 'TR'),
        allowNull: false
    }
});


export default Paiement;
