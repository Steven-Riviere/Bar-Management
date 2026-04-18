import Biere from '../../models/biere.js';

const bieresData = [ 
  {
    name: "Heineken",
    description:"Biere Blonde qui saura ravir vos papilles",
    degree: 3,
  },
  {
    name: "Orange Mécanique",
    description:"Bière blonde au miel d'acacia, la bière Orange Mécanique est un vrai bouquet de saveurs ! Du grand art, comme toujours avec la Brasserie Sainte Cru !",
    degree: 5,
  },
  {
    name: "La Bête",
    description:"La Bête est une bière de caractère qui assume son originalité dans ses recettes.",
    degree: 8,
  }
];

const seedBiere = async () => {
  try {
    await Biere.bulkCreate(bieresData);
    console.info('✅ Database seeded!');
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
};


export default seedBiere;