import Joi from 'joi';
import objectId from 'joi-objectid';

Joi.objectId = objectId(Joi)

const defaultOptions = {
  stripUnknown: true
}

const JoiWithDefaults = Joi.defaults(schema => {
  return schema.options(defaultOptions)
})

export { JoiWithDefaults as Joi }