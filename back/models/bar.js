import {DataTypes} from "sequelize";
import sequelize from "../config/database.js";
import Biere from "./biere.js";
import BarBiere from "./barBiere.js";

const Bar = sequelize.define('Bar',{
    name: {
        type: DataTypes.STRING,
        unique:true,
    },

    address: {
        type: DataTypes.STRING, 
    },

    tel: {
        type: DataTypes.STRING,
        allowNull:false
    },

    description: {
        type: DataTypes.TEXT,
        allowNull:false
    },
});
Bar.belongsToMany(Biere, { through: BarBiere });

export default Bar;