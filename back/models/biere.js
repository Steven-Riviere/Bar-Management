import {DataTypes} from "sequelize";
import sequelize from "../config/database.js";
import Bar from "./bar.js";
import BarBiere from "./barBiere.js";
import BiereCommande from "./biereCommande.js";

const Biere = sequelize.define('Biere', {
    name: {
        type: DataTypes.STRING,
    },

    description: {
        type: DataTypes.TEXT,
        allowNull:false
    },

    degree: {
        type: DataTypes.FLOAT,
    },

    price: {
        type: DataTypes.FLOAT,
        min:(0),
    },
});
Biere.belongsToMany(Bar, { through: BarBiere });
Biere.belongsToMany(Commande, { through: BiereCommande });

export default Biere;