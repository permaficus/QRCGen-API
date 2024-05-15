import Joi, { ValidationError} from 'joi';

const validator = async (schema: any, payload: any) => {
    return await schema.validateAsync(payload, {
        abortEarly: true,
        allowUnknown: false
    })
};
const _template_: any = {
    payload: Joi.object({
        text: Joi.string().required().label('QRCode Key/Text Payload').messages({'string.empty': 'Key for QR Code cannot be an empty value'}),
        output: Joi.string().valid('file', 'stream', 'base64')
            .required().messages({'string.empty': 'You must supply output method for generating QR Code'})
    }).required(),
    options: Joi.object({
        version: Joi.number().label('Version'),
        errorCorrectionLevel: Joi.string().valid('L', 'Q', 'M', 'H').label('Error Correction Level'),
        maskPattern: Joi.any().label('Mask Pattern'),
        scale: Joi.number().max(4).label('Scale'),
        margin: Joi.number().label('Margin'),
        small: Joi.boolean().label('Small'),
        color: Joi.object({
            dark: Joi.string().allow('').label('Color (Dark Section)'),
            light: Joi.string().allow('').label('Color (Light Section)')
        }).unknown(false),
        width: Joi.number().label('Width'),
        type: Joi.any().valid('svg', 'terminal', 'utf8', 'png')
            .required()
            .messages({
                'any.only': 'Output type can be only PNG, SVG, UTF8 and Terminal'
            })
    }).min(1).required(),
    renderOptions: Joi.object({
        quality: Joi.number(),
        deflateLevel: Joi.any(),
        deflateStrategy: Joi.any()
    }).unknown(false)
}
const validateSchema = async (payload: any) => {
    let selectedSchema: any = {}
    for (let props in payload) {
        if (_template_.hasOwnProperty(props)) {
            selectedSchema[props] = _template_[props]
        }
    }
    let schema = Joi.object(selectedSchema)
    return await validator(schema, payload)
}

export { validateSchema, ValidationError }