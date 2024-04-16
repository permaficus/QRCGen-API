import { NextFunction, Request, Response } from "express";

export const pathNotFound = async (req: Request, res: Response, next: NextFunction) => {
    res.status(404);
    next(new Error(`Path Not Found - ${req.originalUrl}`));
}
export const errHandler = async (err: any, req: Request, res: Response, next: NextFunction ) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500
    res.status(statusCode).json({
        status: statusCode,
        details: err.message
    }).end();
}