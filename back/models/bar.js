import {DataTypes} from "sequelize";
import sequelize from "../config/database.js";

const Bar = sequelize.define('Bar',{
    name: {
        type: DataTypes.STRING,
        unique:true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postalCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tel: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM("BAR", "WAREHOUSE"),
        defaultValue: "BAR"
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
});

export default Bar;