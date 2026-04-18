import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Permission = sequelize.define('Permission', {
    name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
    }
}, 
{timestamps: false});

export default Permission;