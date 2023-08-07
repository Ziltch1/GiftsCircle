import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === 'production'
    ? 'https://gifts-circle.herokuapp.com'
    : 'https://gifts-circle.herokuapp.com';

export const socket = io(URL, { reconnectionDelay: 5000 }).connect();
