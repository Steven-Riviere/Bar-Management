import User from "../../models/user.js";
import Permission from "../../models/permission.js";

const seedUserPermissions = async () => {
  try {
    const users = await User.findAll();
    const permissions = await Permission.findAll();

    // helper
    const getPermissions = (names) =>
      permissions.filter(p => names.includes(p.name));

    for (const user of users) {
      let perms = [];

      switch (user.role) {

        case "ADMIN":
          //toutes les permissions
          perms = permissions;
          break;

        case "GERANT":
          perms = getPermissions([
            "VIEW_ORDER",
            "VIEW_PAYMENT",
            "VIEW_BEER", "CREATE_BEER", "UPDATE_BEER",
            "VIEW_BAR", "CREATE_BAR", "UPDATE_BAR", "DELETE_BAR",
            "VIEW_STOCK", "MANAGE_STOCK",
            "VIEW_ANALYTICS"
            
          ]);
          break;

        case "BARMAN":
          perms = getPermissions([
            "CREATE_ORDER", "UPDATE_ORDER", "DELETE_ORDER", "VIEW_ORDER",
            "VIEW_STOCK", "MANAGE_STOCK",
            "VIEW_PAYMENT", "CREATE_PAYMENT", "UPDATE_PAYMENT",
            "VIEW_BEER", "CREATE_BEER", "UPDATE_BEER",
          ]);
          break;

        case "SERVEUR":
          perms = getPermissions([
            "CREATE_ORDER", "UPDATE_ORDER", "VIEW_ORDER",
            "VIEW_PAYMENT"
          ]);
          break;

        case "STAGIAIRE":
          perms = getPermissions([
            "CREATE_ORDER", "UPDATE_ORDER", "VIEW_ORDER", "VIEW_PAYMENT"
          ]);
          break;

        case "RH":
          perms = getPermissions([
            "CREATE_USER", "UPDATE_USER", "VIEW_USER",
            "ASSIGN_PERMISSIONS"
          ]);
          break;

        default:
          perms = [];
      }

      await user.addPermissions(perms);
    }

    console.log("UserPermissions seeded successfully.");
  } catch (error) {
    console.error("Error seeding UserPermissions:", error);
  }
};

export default seedUserPermissions;