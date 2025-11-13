import Bar from '../../models/bar.js';

const barsData = [
    {
        name: 'Bar\'aka',
        address: '35 rue Baker Street',
        tel: '02-47-XX-XX-XX',
        description: 'le meilleur bar du quartier de guillotière',
    },
    {
        name: 'Baroque',
        address: '48 rue Baker Street',
        tel: '02-47-XX-XX-XX',
        description: 'Un lieu d\'exception',
    },
    {
        name: 'Las Ketchup',
        address: '118 rue de Nazareth',
        tel: '02-47-XX-XX-XX',
        description: 'Situé dans la rue de Jesus, néanmoins nous ne faisons pas de miracle',
    },
    {
        name: 'Bratislaboys',
        address: '45 rue du papa pingouin',
        tel: '09-47-XX-XX-XX',
        description: 'revivez les meilleurs décennies dans cette ambiance de folie',
    },
    {
        name: 'Crazy Frog',
        address: '20 000 lieux sous la mer',
        tel: '02-47-XX-XX-XX',
        description: 'Cet établissement est la copie conforme d\'un navire, entre marée haute et basse. Tenez vous bien pour les odeurs',
    },
    {
        name: 'Destinyz',
        address: '25 rue des divas',
        tel: '02-47-XX-XX-XX',
        description: 'le bar où une seule reine peut survivre, challenge et Karaoké permanent dans ce bar. Venez montrer au monde vos vocalises',
    },
    {
        name: 'RaouBar',
        address: '8 rue du perdu',
        tel: '02-47-XX-XX-XX',
        description: 'si vous trouvez ce bar, vous avez gagné un verre de gin de 3L',
    },
    {
        name: 'Shéhérazade',
        address: '354 rue du désert',
        tel: '02-47-XX-XX-XX',
        description: 'le bar le plus caliente du quartier, revivez les 1000 et une nuit',
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