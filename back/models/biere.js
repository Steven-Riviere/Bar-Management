import {DataTypes} from "sequelize";
import sequelize from "../config/database.js";

const Biere = sequelize.define('Biere', {
    name: {
        type: DataTypes.STRING,
        unique: true
    },

    description: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    degree: DataTypes.FLOAT,
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
});

export default Biere;