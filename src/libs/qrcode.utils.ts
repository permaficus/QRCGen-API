import QRCode from 'qrcode'

type encodingMode = 'alphanumeric' | 'byte' | 'numeric' | 'auto'

interface Payload {
    text: string
    output: 'string' | 'file' | 'fileStream' | 'dataURL' | 'canvas'
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

export const generateQRCode = async (payload: Payload, options?: Options, renderType?: RenderOptions) => {
    const outputFormat = ['file', 'string', 'canvas', 'dataURL', 'fileStream'];
    if (!outputFormat.includes(payload.output)) {
        throw new Error('Unsupported output format');
    }
    try {        
        switch (payload.output) {
            case 'string': {
                return await QRCode.toString(payload.text, { ...options });
            }
            case 'dataURL': {
                return await QRCode.toDataURL(payload.segment, payload.text, { ...options, rendererOpts: { ...renderType } });
            }
            case 'file': {
                return await QRCode.toFile('/images', payload.text, { rendererOpts: { ...renderType }, ...options })
            }
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}