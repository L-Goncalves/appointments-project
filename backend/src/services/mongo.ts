import mongoose from 'mongoose';

class MongoConnection {
  private static instance: MongoConnection;
  private isConnected: boolean = false;

  private constructor() {}

  public static getInstance(): MongoConnection {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection();
    }
    return MongoConnection.instance;
  }

  public async connect(uri: string) {
    if (this.isConnected) {
      console.log('MongoDB já conectado.');
      return mongoose.connection;
    }

    try {
      await mongoose.connect(uri);
      this.isConnected = true;

      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB desconectado');
        this.isConnected = false;
      });

      mongoose.connection.on('reconnected', () => {
        console.log('MongoDB reconectado');
        this.isConnected = true;
      });

      console.log('MongoDB conectado com sucesso.');
      return mongoose.connection;
    } catch (error) {
      console.error('Erro ao conectar ao MongoDB:', error);
      throw error;
    }
  }

  public getConnection() {
    if (!this.isConnected) {
      throw new Error('MongoDB não está conectado');
    }
    return mongoose.connection;
  }
}

export default MongoConnection.getInstance();
