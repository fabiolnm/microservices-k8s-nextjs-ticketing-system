import { ConnectionOptions } from "nats";

export const connectionOptions: ConnectionOptions = {
  servers: 'localhost:4222',
  pingInterval: 5000,
  maxPingOut: 2,
}
