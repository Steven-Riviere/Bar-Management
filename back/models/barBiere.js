import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const BarBiere = sequelize.define('BarBiere', {
    prix: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        min:(0),
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},
{timestamps: false});

export default BarBiere;