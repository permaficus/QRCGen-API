import QRCode from 'qrcode'
import Crypto from 'crypto'

type encodingMode = 'alphanumeric' | 'byte' | 'numeric' | 'auto'

interface Payload {
    text?: string
    segment?: any
    output: 'file' | 'stream' | 'base64'
    encoding?: encodingMode
}
interface Options {
    version?: number
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
    maskPattern?: any
    scale?: number
    margin?: number | 2
    small?: number
    color?: {
        dark?: string
        light?: string
    }
    width?: number
    type?: any | 'svg' | 'terminal' | 'utf8' | 'png'
}
interface RenderOptions {
    quality?: number
    deflateLevel?: any
    deflateStrategy?: any
}

export class QRCodeUnknownError extends Error {
    statusCode: number

    constructor(message: string, statusCode: number) {
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.name = this.constructor.name

        Object.setPrototypeOf(this, QRCodeUnknownError.prototype)
    }
}

const createId = (payload: any): string => {
    const id = Crypto.createHash('sha256');
    id.update(payload);
    return id.digest('hex').substring(0, 20);
}

export const generateQRCode = async (payload: Payload, options?: Options, renderType?: RenderOptions) => {
    try {        
        switch (payload.output) {
            case 'base64': {
                return await QRCode.toDataURL(payload.text || payload.segment, { ...options, rendererOpts: { ...renderType } });
            }
            case 'file': {
                const id = createId(payload.text || Math.random().toString());
                //@ts-ignore
                await QRCode.toFile(`./qrcodes/${id}.${options?.type}`, payload.text || payload.segment, { rendererOpts: { ...renderType }, ...options });
                return id
            }
        }
    } catch (error: any) {
        throw new QRCodeUnknownError(error.message.replace(/[",\n]/g, ''), 400)
    }
}