import { generateQRCode } from "../../libs/qrcode.utils";
import { Request, Response } from 'express'

export const handleIncommingRequest = async (req: Request, res: Response) => {
    const { payload, options, renderOptions } = req.body;
    try {
        const qrcodes = await generateQRCode(payload, options, renderOptions);
        res.status(200).json({
            status: 'OK',
            code: 200,
            ...payload.output === 'dataURL' && { file: qrcodes },
            ...payload.output === 'file' && { url: `http://localhost:5005/api/v1/images/${payload.text}.png` }
        })
    } catch (error: any) {
        res.status(400).json({
            status: 'ERR_BAD_REQUEST',
            code: 400,
            message: error.message
        }).end();
    }

}