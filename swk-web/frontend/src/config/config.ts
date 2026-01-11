// src/config/config.ts

const API_DNS = import.meta.env.VITE_API_DNS;
const API_PORT = import.meta.env.VITE_API_PORT;

export const API_URL = `http://${API_DNS}:${API_PORT}`;
