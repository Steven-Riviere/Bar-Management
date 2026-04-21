import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Table = sequelize.define('Table',{
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    barId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ["number", "barId"]
        }
    ]
});

export default Table;