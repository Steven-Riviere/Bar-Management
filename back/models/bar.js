import {DataTypes} from "sequelize";
import sequelize from "../config/database.js";

const Bar = sequelize.define('Bar',{
    name: {
        type: DataTypes.STRING,
        unique:true,
    },
    address: DataTypes.STRING, 
    tel: {
        type: DataTypes.STRING,
        allowNull:false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull:false
    },
});

export default Bar;