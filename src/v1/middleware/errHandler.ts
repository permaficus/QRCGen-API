import { NextFunction, Request, Response } from "express";

export const jsonError = async (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) {
        res.status(400).send({
            status: 'ERR_BAD_REQUEST',
            code: res.statusCode,
            details: `Oops..there is something wrong with your request. We cant process it`
        }).end();
        return;
    }
}
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