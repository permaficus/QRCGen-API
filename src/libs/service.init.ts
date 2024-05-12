import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import {
    SERVICE_PORT,
    NODE_ENV,
    allowedOrigin
} from "@/constant/config"
import { router as v1 } from '@/v1/routes'
import { fileNotFound, jsonError } from '@/v1/middleware/errHandler'

const httpServer: Express = express()
const httpServerInit = async () => {
    httpServer.use(express.urlencoded({ extended: true }))
    httpServer.use(express.json())
    httpServer.use(cors({
        ...allowedOrigin.length !== 0 ? { origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            if (!allowedOrigin.includes(origin)) {
                const error = new Error(`Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at ${origin}.`);
                delete error.stack
                return callback(error, false)
            }
            return callback(null, true)
        }} : {}
    }))
    httpServer.use('/qrcodes', express.static('qrcodes'))
    httpServer.use('/qrcodes', fileNotFound)
    httpServer.use('/api/v1', v1);
    httpServer.use(jsonError);
}

export { httpServerInit, httpServer, SERVICE_PORT, NODE_ENV }

