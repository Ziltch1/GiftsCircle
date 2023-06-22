import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === 'production' ? "https://gift-circle-server.onrender.com" : 'http://localhost:3100';

export const socket = io(URL, { reconnectionDelay: 5000 }).connect();
