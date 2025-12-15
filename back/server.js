import cors from 'cors';
import express from 'express';
import sequelize from './config/database.js';
import './models/association.js';
import { seedDatabase } from "./config/seed/index.js";
import dotenv from "dotenv";
import authRoutes from './routes/auth.js';
import barsRoutes from './routes/bars.js';
import bieresRoutes from './routes/bieres.js';
import barBiereRoutes from './routes/barBiere.js';
import commandesRoutes from './routes/commandes.js';
import paiementsRoutes from './routes/paiements.js';
import tablesRoutes from './routes/tables.js';

//env
dotenv.config();

const app = express();
const port = 3000;

//utilisation de CORS
app.use(cors({
    origin: "http://localhost:5173"
}));

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Utilisation des routes
app.use('/auth', authRoutes);
app.use('/bars', barsRoutes);
app.use('/bieres', bieresRoutes);
app.use('/barBiere', barBiereRoutes);
app.use('/commandes', commandesRoutes);
app.use('/paiements', paiementsRoutes);
app.use('/tables', tablesRoutes);

sequelize
  .sync()
  //.sync({force : true}) pour reset la bdd quand on rajoutera des seed a l'avenir
  .then(async () => {
    console.log('✅ Database & tables created!');
    await seedDatabase();
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

//lancement du serveur
app.listen(port, () => {
  console.log(`✅ API Server is running on port ${port}`);
});