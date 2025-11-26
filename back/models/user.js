import {DataTypes} from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define('User',{
    name : {
        type : DataTypes.STRING,
        required : [true, 'veuillez entrer un prénom'],
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
        isEmail: true
        },
        required : [true, 'Un mail est obligatoire'],
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        required : [true, 'Le mot de passe est obligatoire'],
    },
    role: {
        type: DataTypes.ENUM("ADMIN", "GERANT", "SERVEUR", "BARMAN", "STAGIAIRE"),
        defaultValue: "SERVEUR",
    }
},
{timestamps: false});

export default User;