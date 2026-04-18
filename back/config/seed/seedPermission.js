import Permission from "../../models/permission.js";

const permissionsData = [
  // ORDERS
  { name: "CREATE_ORDER" },
  { name: "UPDATE_ORDER" },
  { name: "DELETE_ORDER" },
  { name: "VIEW_ORDER" },

  // PAYMENTS
  { name: "CREATE_PAYMENT" },
  { name: "UPDATE_PAYMENT" },
  { name: "DELETE_PAYMENT" },
  { name: "VIEW_PAYMENT" },

  // BEERS
  { name: "CREATE_BEER" },
  { name: "UPDATE_BEER" },
  { name: "DELETE_BEER" },
  { name: "VIEW_BEER" },

  // BARS
  { name: "CREATE_BAR" },
  { name: "UPDATE_BAR" },
  { name: "DELETE_BAR" },
  { name: "VIEW_BAR" },

  // STOCK
  { name: "VIEW_STOCK" },
  { name: "MANAGE_STOCK" },

  // ANALYTICS
  { name: "VIEW_ANALYTICS" },

  // USERS / RH
  { name: "CREATE_USER" },
  { name: "UPDATE_USER" },
  { name: "DELETE_USER" },
  { name: "VIEW_USER" },
  { name: "ASSIGN_PERMISSIONS" }
];

const seedPermissions = async () => {
  try {
    await Permission.bulkCreate(permissionsData, {
      ignoreDuplicates: true // évite les doublons
    });

    console.log("Permissions seeded successfully.");
  } catch (error) {
    console.error("Error seeding permissions:", error);
  }
};

export default seedPermissions;