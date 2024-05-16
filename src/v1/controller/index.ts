import { QRCodeUnknownError, generateQRCode } from "@/libs/qrcode.utils";
import { Request, Response, NextFunction } from 'express';
import { SERVICE_PORT } from "@/constant/config";
import { readFile } from 'fs/promises'

const errorStatus: any = {
    400: {
        status: 'ERR_BAD_REQUEST'
    },
    500: {
        status: 'ERR_BAD_SERVICE'
    }
}
export const handleIncommingRequest = async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'GET' && req.params.filename) {
        try {
            const file = await readFile(`qrcodes/${req.params.filename}`);
            res.set('Content-Type', 'application/octet-stream');
            res.set('Content-Disposition', `attachment; filename=${req.params.filename}`);
            res.status(200).send(file);
            return;
        } catch (error: any) {
            res.status(404);
            next();
            return;
        }
    }
    const { payload, options, renderOptions } = req.body;
    try {
        const qrcodes = await generateQRCode(payload, options, renderOptions);
        res.status(200).json({
            status: 'OK',
            code: 200,
            ...payload.output === 'base64' && {
                result: {
                    base64file: qrcodes
                }
             },
            ...payload.output === 'file' && { 
                result : {
                    image: `${req.protocol}://${req.hostname}${SERVICE_PORT !== '80' ? `:${SERVICE_PORT}`: ''}/qrcodes/${qrcodes}.${options.type}`,
                    download_link: `${req.protocol}://${req.hostname}${SERVICE_PORT !== '80' ? `:${SERVICE_PORT}`: ''}/api/v1/download/${qrcodes}.${options.type}` 
                }
            }
        })
    } catch (error: any) {
        let statusCode: number = 500
        if (error instanceof QRCodeUnknownError) {
            statusCode = error.statusCode;
        }
        res.status(statusCode).json({
            status: errorStatus[statusCode].status,
            code: statusCode,
            message: error.message
        }).end();
    }

}