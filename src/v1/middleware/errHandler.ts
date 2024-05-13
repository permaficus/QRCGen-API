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
    next(err)
}
export const fileNotFound = async (err: any, res: Response) => {
    res.status(404).json({
        status: 'FILE_NOT_FOUND',
        code: 404,
        error_message: `File Doesn't Exist - ${err.url.substring(1, err.url.length)}`
    })
}
export const defaultNotFound = async (err: any, res: Response, next: NextFunction) => {
    res.status(404).json({
        status: 'ERR_NOT_FOUND',
        code: 404,
        details: `URL Not Found - ${err.originalUrl}`
    })
}