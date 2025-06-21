// lib/redis.ts
import { createClient } from 'redis';

const client = createClient({
  socket: {
        host: 'redis-18935.c89.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 18935
    },
 password: 'IpI95MAzl6XGa6klwXl2hPoe8Thv0N7k',
});

let connected = false;

export async function getRedisClient() {
  if (!connected) {
    client.on('error', err => console.error('Redis error:', err));
    await client.connect();
    connected = true;
  }
  return client;
}
