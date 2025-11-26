import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Table = sequelize.define('Table',{
    number: {
        type: DataTypes.INTEGER,
        unique:true,
    },
    bar_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

export default Table;