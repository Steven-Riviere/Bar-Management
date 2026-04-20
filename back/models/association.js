import Biere from "./biere.js";
import Bar from "./bar.js";
import BarBiere from "./barBiere.js";
import BiereCommande from "./biereCommande.js";
import Commande from "./commande.js";
import Paiement from "./paiement.js";
import CommandePaiement from "./commandePaiement.js";
import Table from "./table.js";
import Permission from "./permission.js";
import User from "./user.js";
import UserPermission from "./userPermission.js";
import StockMovement from "./stockMovement.js";

// --- Associations --- //
// Bar <-> Biere
Bar.belongsToMany(Biere, { through: BarBiere });
Biere.belongsToMany(Bar, { through: BarBiere });

// Commande <-> Biere
Commande.belongsToMany(Biere, { through: BiereCommande });
Biere.belongsToMany(Commande, { through: BiereCommande });

// Commande <-> Paiement
Commande.belongsToMany(Paiement, { through: CommandePaiement });
Paiement.belongsToMany(Commande, { through: CommandePaiement });

// Table <-> Commande
Table.hasMany(Commande, { foreignKey: "table_id" });
Commande.belongsTo(Table, { foreignKey: "table_id" });

// Table <-> Bar
Bar.hasMany(Table, { foreignKey: "bar_id" });
Table.belongsTo(Bar, { foreignKey: "bar_id" });

//User <-> Permission
User.belongsToMany(Permission, { through: UserPermission, foreignKey: "user_id" });
Permission.belongsToMany(User, { through: UserPermission, foreignKey: "permission_id" });

//Mouvement des stocks de biere
Biere.hasMany(StockMovement, { foreignKey: "biere_id" });
StockMovement.belongsTo(Biere, { foreignKey: "biere_id" });

Bar.hasMany(StockMovement, { foreignKey: "from_bar_id", as: "fromMovements" });
Bar.hasMany(StockMovement, { foreignKey: "to_bar_id", as: "toMovements" });

export {
    Biere,
    Bar,
    BarBiere,
    BiereCommande,
    Commande,
    Paiement,
    CommandePaiement,
    Table,
    Permission,
    User,
    UserPermission,
    StockMovement
};