import Joi from 'joi';

const validator = async (schema: any, payload: any) => {
    return await schema.validateAsync(payload, {
        abortEarly: true,
        allowUnknow: false
    })
};
const _template_: any = {
    payload: Joi.object({
        text: Joi.string().required().label('QRCode Key'),
        output: Joi.string().valid('file', 'stream', 'dataURL').required()
    }).required(),
    options: Joi.object({
        version: Joi.number().label('Version'),
        errorCorrectionLevel: Joi.string().valid('L', 'Q', 'M', 'H').label('Error Correction Level'),
        maskPattern: Joi.any().label('Mask Pattern'),
        scale: Joi.number().label('Scale'),
        margin: Joi.number().label('Margin'),
        small: Joi.number().label('Small'),
        color: Joi.object({
            dark: Joi.string().allow('').label('Color (Dark Section)'),
            light: Joi.string().allow('').label('Color (Light Section)')
        }),
        width: Joi.number().label('Width'),
        type: Joi.any().valid('svg', 'terminal', 'utf8', 'png')
    }).min(1).required(),
    renderOptions: Joi.object({
        quality: Joi.number(),
        deflateLevel: Joi.any(),
        deflateStrategy: Joi.any()
    })
}
export const validateSchema = async (payload: any) => {
    let selectedSchema: any = {}
    for (let props in payload) {
        if (_template_.hasOwnProperty(props)) {
            selectedSchema[props] = _template_[props]
        }
    }
    let schema = Joi.object(selectedSchema)
    return await validator(schema, payload)
}