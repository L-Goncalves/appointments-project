import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import mongoConnection from './services/mongo';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/default_db';
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    const app = express();
    console.log(`URL: ${MONGO_URI}`)
    await mongoConnection.connect(MONGO_URI);

    app.use(express.json());
    app.use('/api', routes);
    app.listen(PORT, () => {

      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar servidor:', error);
    process.exit(1);
  }
}

startServer();