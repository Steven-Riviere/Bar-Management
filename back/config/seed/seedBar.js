import Bar from '../../models/bar.js';

const barsData = [
  {
    name: "Le Comptoir Central",
    address: "12 Rue de la République",
    postalCode: "69001",
    city: "Lyon",
    tel: "04 72 00 00 01"
  },
  {
    name: "Bar du Marché",
    address: "8 Place des Jacobins",
    postalCode: "69002",
    city: "Lyon",
    tel: "04 72 00 00 02"
  },
  {
    name: "Le Bistrot Moderne",
    address: "21 Rue de la Barre",
    postalCode: "69002",
    city: "Lyon",
    tel: "04 72 00 00 03"
  },
  {
    name: "La Terrasse Urbaine",
    address: "5 Quai de la Pêcherie",
    postalCode: "69009",
    city: "Lyon",
    tel: "04 72 00 00 04"
  },
  {
    name: "Le Café Industriel",
    address: "14 Rue des Docks",
    postalCode: "69007",
    city: "Lyon",
    tel: "04 72 00 00 05"
  },
  {
    name: "L’Atelier des Bars",
    address: "3 Rue du Bon Pasteur",
    postalCode: "69001",
    city: "Lyon",
    tel: "04 72 00 00 06"
  },
  {
    name: "Le Carré des Vins",
    address: "27 Rue Mercière",
    postalCode: "69002",
    city: "Lyon",
    tel: "04 72 00 00 07"
  },
  {
    name: "La Cave à Cocktails",
    address: "9 Rue de la Charité",
    postalCode: "69002",
    city: "Lyon",
    tel: "04 72 00 00 08"
  },
];


const seedBar = async () => {
  try {
    await Bar.bulkCreate(barsData);
    console.info('✅ Database seeded!');
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
};

export default seedBar;