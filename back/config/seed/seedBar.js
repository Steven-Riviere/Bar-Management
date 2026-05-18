import Bar from '../../models/bar.js';

const barsData = [
  {
    name: "Entrepôt Central",
    address: "Zone Industrielle",
    postalCode: "69000",
    city: "Lyon",
    tel: "02 47 00 00 00",
    type: "WAREHOUSE"
  },
  {
    name: "Le Comptoir Central",
    address: "12 Rue de la République",
    postalCode: "69001",
    city: "Lyon",
    tel: "04 72 00 00 01",
    type: "BAR"
  },
  {
    name: "Bar du Marché",
    address: "8 Place des Jacobins",
    postalCode: "69002",
    city: "Lyon",
    tel: "04 72 00 00 02",
    type: "BAR"
  },
  {
    name: "Le Bistrot Moderne",
    address: "21 Rue de la Barre",
    postalCode: "69002",
    city: "Lyon",
    tel: "04 72 00 00 03",
    type: "BAR"
  },
  {
    name: "La Terrasse Urbaine",
    address: "5 Quai de la Pêcherie",
    postalCode: "69009",
    city: "Lyon",
    tel: "04 72 00 00 04",
    type: "BAR"
  },
  {
    name: "Le Café Industriel",
    address: "14 Rue des Docks",
    postalCode: "69007",
    city: "Lyon",
    tel: "04 72 00 00 05",
    type: "BAR"
  },
  {
    name: "L’Atelier des Bars",
    address: "3 Rue du Bon Pasteur",
    postalCode: "69001",
    city: "Lyon",
    tel: "04 72 00 00 06",
    type: "BAR"
  },
  {
    name: "Le Carré des Vins",
    address: "27 Rue Mercière",
    postalCode: "69002",
    city: "Lyon",
    tel: "04 72 00 00 07",
    type: "BAR"
  },
  {
    name: "La Cave à Cocktails",
    address: "9 Rue de la Charité",
    postalCode: "69002",
    city: "Lyon",
    tel: "04 72 00 00 08",
    type: "BAR"
  },
];

const seedBar = async () => {
  try {
    await Bar.destroy({ where: {}, force: true });
    await Bar.bulkCreate(barsData);

    console.info("✅ Bars seeded");
  } catch (error) {
    console.error("Failed to seed bars:", error);
  }
};

export default seedBar;