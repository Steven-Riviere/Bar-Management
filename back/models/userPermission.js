import {DataTypes} from "sequelize";
import sequelize from "../config/database.js";

const UserPermission = sequelize.define("UserPermission", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, 
{timestamps: false});

export default UserPermission;
