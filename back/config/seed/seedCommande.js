import Commande from "../../models/commande.js";
import Table from "../../models/table.js";
import BarBiere from "../../models/barBiere.js";
import BiereCommande from "../../models/biereCommande.js";
import User from "../../models/user.js";

function randomDateWithin(days = 30) {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * days));

  const hours = [11, 12, 13, 18, 19, 20, 21, 22];
  date.setHours(hours[Math.floor(Math.random() * hours.length)]);
  date.setMinutes(Math.floor(Math.random() * 60));
  date.setSeconds(Math.floor(Math.random() * 60));

  return date;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const seedCommande = async () => {
  try {
    const tables = await Table.findAll();
    const users = await User.findAll();
    const barBieres = await BarBiere.findAll({ where: { active: true } });

    console.log({
      tables: tables.length,
      users: users.length,
      barBieres: barBieres.length
    });

    if (!tables.length || !users.length || !barBieres.length) {
      throw new Error("Données manquantes (tables/users/barBieres)");
    }

    // map barId -> bières dispo
    const map = new Map();
    for (const bb of barBieres) {
      if (!map.has(bb.barId)) map.set(bb.barId, []);
      map.get(bb.barId).push(bb);
    }

    const orders = [];

    for (let i = 0; i < 45; i++) {

      const table = pickRandom(tables);
      const user = pickRandom(users);
      const beers = map.get(table.barId) || [];

      if (!beers.length) continue;

      const order = await Commande.create({
        tableId: table.id,
        userId: user.id,
        date: randomDateWithin(30),
        status: Math.random() > 0.25 ? "fini" : "en cours",
        price: 0
      });

      let total = 0;

      const nbItems = 1 + Math.floor(Math.random() * 4);

      // éviter doublons dans une même commande
      const usedBeers = new Set();

      for (let j = 0; j < nbItems; j++) {

        let bb;

        // on force une bière différente à chaque ligne
        let safety = 0;
        do {
          bb = pickRandom(beers);
          safety++;
        } while (usedBeers.has(bb.biereId) && safety < 10);

        usedBeers.add(bb.biereId);

        const qty = 1 + Math.floor(Math.random() * 3);
        const unitPrice = bb.price;
        const lineTotal = qty * unitPrice;

        total += lineTotal;

        await BiereCommande.create({
          commandeId: order.id,
          biereId: bb.biereId,
          quantity: qty,
          unitPrice,
          totalPrice: lineTotal
        });
      }

      await order.update({ price: total });

      orders.push(order);
    }

    console.log(`Seed commandes OK (${orders.length})`);
  } catch (err) {
    console.error("Seed commandes failed:", err);
  }
};

export default seedCommande;