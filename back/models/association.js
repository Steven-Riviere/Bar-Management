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
Bar.belongsToMany(Biere, { through: BarBiere, foreignKey: "barId", otherKey: "biereId" });
Biere.belongsToMany(Bar, { through: BarBiere, foreignKey: "biereId", otherKey: "barId" });
BarBiere.belongsTo(Bar, { foreignKey: "barId" });
BarBiere.belongsTo(Biere, { foreignKey: "biereId" });
Bar.hasMany(BarBiere, { foreignKey: "barId" });
Biere.hasMany(BarBiere, { foreignKey: "biereId" });


// Commande <-> Biere
Commande.belongsToMany(Biere, { through: BiereCommande, foreignKey: "commandeId", otherKey: "biereId" });
Biere.belongsToMany(Commande, { through: BiereCommande, foreignKey: "biereId", otherKey: "commandeId" });
Biere.hasMany(BiereCommande, { foreignKey: "biereId" });
BiereCommande.belongsTo(Biere, { foreignKey: "biereId" });
Commande.hasMany(BiereCommande, { foreignKey: "commandeId" });
BiereCommande.belongsTo(Commande, { foreignKey: "commandeId" });
User.hasMany(Commande, { foreignKey: "userId" });
Commande.belongsTo(User, { foreignKey: "userId" });
Commande.belongsTo(Bar, { foreignKey: "barId" });
BiereCommande.belongsTo(Bar, { foreignKey: "barId" });
BiereCommande.belongsTo(Biere, { foreignKey: "biereId" });


// Commande <-> Paiement
Commande.belongsToMany(Paiement, { through: CommandePaiement, foreignKey: "commandeId", otherKey: "paiementId" });
Paiement.belongsToMany(Commande, { through: CommandePaiement, foreignKey: "paiementId", otherKey: "commandeId" });

// Table <-> Commande
Table.hasMany(Commande, { foreignKey: "tableId" });
Commande.belongsTo(Table, { foreignKey: "tableId" });

// Table <-> Bar
Bar.hasMany(Table, { foreignKey: "barId" });
Table.belongsTo(Bar, { foreignKey: "barId" });

//User <-> Permission
User.belongsToMany(Permission, { through: UserPermission, foreignKey: "userId", otherKey: "permissionId" });
Permission.belongsToMany(User, { through: UserPermission, foreignKey: "permissionId", otherKey: "userId" });

//Mouvement des stocks de biere
Biere.hasMany(StockMovement, { foreignKey: "biereId" });
StockMovement.belongsTo(Biere, { foreignKey: "biereId" });

Bar.hasMany(StockMovement, { foreignKey: "fromBarId", as: "fromMovements" });
Bar.hasMany(StockMovement, { foreignKey: "toBarId", as: "toMovements" });
StockMovement.belongsTo(Bar, { foreignKey: "fromBarId", as: "fromBar" });
StockMovement.belongsTo(Bar, { foreignKey: "toBarId", as: "toBar" });

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