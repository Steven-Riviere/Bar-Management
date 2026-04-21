import {DataTypes} from "sequelize";
import sequelize from "../config/database.js";

const UserPermission = sequelize.define("UserPermission", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, 
{timestamps: false});

export default UserPermission;
