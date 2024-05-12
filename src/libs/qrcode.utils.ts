import QRCode from 'qrcode'
import Crypto from 'crypto'

type encodingMode = 'alphanumeric' | 'byte' | 'numeric' | 'auto'

interface Payload {
    text: string
    output: 'file' | 'stream' | 'dataURL'
    segment?: any
    encoding?: encodingMode
}
interface Options {
    version?: number
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
    maskPattern?: any
    scale?: number
    margin?: number
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

const createId = (payload: any): string => {
    const id = Crypto.createHash('sha256');
    id.update(payload);
    return id.digest('hex').substring(0, 20);
}

export const generateQRCode = async (payload: Payload, options?: Options, renderType?: RenderOptions) => {
    const outputFormat = ['file', 'dataURL', 'fileStream'];
    if (!outputFormat.includes(payload.output)) {
        throw new Error('Unsupported output format');
    }
    try {        
        switch (payload.output) {
            case 'dataURL': {
                return await QRCode.toDataURL(payload.text, { ...options, rendererOpts: { ...renderType } });
            }
            case 'file': {
                const id = createId(payload.text);
                await QRCode.toFile(`./qrcodes/${id}.${options?.type}`, payload.text, { rendererOpts: { ...renderType }, ...options });
                return id
            }
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}