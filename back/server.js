import cors from 'cors';
import express from 'express';
import sequelize from './config/database.js';
import './models/association.js';
import { seedDatabase } from "./config/seed/index.js";
import dotenv from "dotenv";

const app = express();
const port = 3000;

//utilisation de CORS
app.use(cors({
    origin: "http://localhost:5173"
}));

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Utilisation des routes
//a rajouter a l'avenir

//env
dotenv.config();

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

app.listen(port, () => {
  console.log(`✅ API Server is running on port ${port}`);
});