import {DataTypes} from "sequelize";
import sequelize from "../config/database.js";

const Biere = sequelize.define('Biere', {
    name: DataTypes.STRING,
    description: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    degree: DataTypes.FLOAT,
    price: {
        type: DataTypes.FLOAT,
        min:(0),
    },
});

export default Biere;