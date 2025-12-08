import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const BarBiere = sequelize.define('BarBiere', {
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        min:(0),
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    }
},
{timestamps: false});

export default BarBiere;