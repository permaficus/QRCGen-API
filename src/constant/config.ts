import dotenv from 'dotenv';
dotenv.config().parsed;

export const NODE_ENV = process.env.NODE_ENV || 'DEVELOPMENT'
export const SERVICE_PORT = process.env.SERVICE_PORT || 5005
/**
 * A list for CORS policy
 * Leave empty array to allow from all(*)
 */
export const allowedOrigin: any = []