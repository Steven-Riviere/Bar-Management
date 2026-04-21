import Biere from '../../models/biere.js';

const bieresData = [ 
  {
    name: "Heineken",
    description: "Bière blonde légère et rafraîchissante, grand classique international.",
    degree: 5,
  },
  {
    name: "Leffe Blonde",
    description: "Bière belge douce et légèrement épicée, très équilibrée.",
    degree: 6.6,
  },
  {
    name: "Chimay Bleue",
    description: "Bière trappiste puissante aux arômes maltés et caramélisés.",
    degree: 9,
  },
  {
    name: "Corona Extra",
    description: "Bière blonde mexicaine légère, parfaite avec un citron.",
    degree: 4.5,
  },
  {
    name: "Kronenbourg 1664",
    description: "Bière française emblématique, douce et légèrement amère.",
    degree: 5,
  },
  {
    name: "Desperados",
    description: "Bière aromatisée à la tequila, sucrée et originale.",
    degree: 5.9,
  },
  {
    name: "Hoegaarden",
    description: "Bière blanche belge rafraîchissante aux notes d’agrumes.",
    degree: 4.9,
  },
  {
    name: "Guinness",
    description: "Stout irlandaise noire, crémeuse et intense en goût.",
    degree: 4.2,
  }
];

const seedBiere = async () => {
  try {
    await Biere.destroy({ where: {} });
    
    await Biere.bulkCreate(bieresData);
    console.info('✅ Bières créées avec succès !');
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
};


export default seedBiere;