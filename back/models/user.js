import {DataTypes} from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define('User',{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { 
            isEmail: true 
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(
        "ADMIN",
        "GERANT",
        "RH",
        "SERVEUR",
        "BARMAN",
        "STAGIAIRE"
      ),
      defaultValue: "SERVEUR",
    },
    barId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    last_login: DataTypes.DATE

},
{timestamps: false});

export default User;