import Bar from '../../models/bar.js';
import Biere from '../../models/biere.js';

const seedBarBiere = async () => {
  try {
    //bars
    const baroque = await Bar.findOne({where: {name: "Baroque"}});
    const lasKetchup = await Bar.findOne({where: {name: "Las Ketchup"}});

    //bieres
    const heineken = await Biere.findOne({where: {name: "Heineken"}});
    const orangeMeca = await Biere.findOne({where: {name: "Orange Mécanique"}});

    //liaison
    await baroque.addBiere(heineken);
    await lasKetchup.addBiere(orangeMeca);

    console.info('✅ Database seeded!');
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
};

export default seedBarBiere;