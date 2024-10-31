import { PrismaClient } from '@prisma/client';      // prismaClient.js
import CONFIG from '../config/config.js'
const { MONGO_DB_URL, DB_NAME } = CONFIG;

// Initialize Prisma client instance
const prisma = new PrismaClient({
    datasources: {
      db: {
        url: `${MONGO_DB_URL}/${DB_NAME}`
      },
    },
  });

async function dbConnect() {
    try {
        await prisma.$connect();
        console.log('DB Connected');
    } catch (error) {
        console.error('Error connecting to the DB : ', error.message);
        process.exit(1);  // Exit the process if there's an error
    }
}

export default dbConnect;