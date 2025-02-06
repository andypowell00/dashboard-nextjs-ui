import { createClient } from 'redis';

const redis = createClient({
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PW,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT), 
  },
});

// Handle errors
redis.on('error', (err) => console.error('Redis Client Error:', err));

async function connectRedis() {
  if (!redis.isOpen) {
    await redis.connect();
    console.log('Connected to Redis');
  }
}

// Ensure Redis is connected before exporting
connectRedis().catch((err) => console.error('Failed to connect to Redis:', err));

export default redis;
