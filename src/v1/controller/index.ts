import { generateQRCode } from "../../libs/qrcode.utils";
import { Request, Response } from 'express';
import { SERVICE_PORT } from "../../constant/config";

export const handleIncommingRequest = async (req: Request, res: Response) => {
    const { payload, options, renderOptions } = req.body;
    try {
        const qrcodes = await generateQRCode(payload, options, renderOptions);
        res.status(200).json({
            status: 'OK',
            code: 200,
            ...payload.output === 'dataURL' && { base64file: qrcodes },
            ...payload.output === 'file' && { 
                url: `${req.protocol}://${req.hostname}${SERVICE_PORT !== '80' ? SERVICE_PORT : ''}/api/v1/images/${payload.text}.${options.type}` 
            }
        })
    } catch (error: any) {
        res.status(400).json({
            status: 'ERR_BAD_REQUEST',
            code: 400,
            message: error.message
        }).end();
    }

}