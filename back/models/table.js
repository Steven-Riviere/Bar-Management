import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Table = sequelize.define('Table',{
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bar_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ["number", "bar_id"]
        }
    ]
});

export default Table;