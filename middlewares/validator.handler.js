const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  // console.error('validatorHandler');
  return (req, res, next) => {
    const data = req[property];
    // schema.validate(data, {abortEarly: false}); >> Para enviar todos los errores
    // schema.validate(data); >> Para enviar error por error
    const { error } = schema.validate(data, {abortEarly: false});
    if (error){
      next(boom.badRequest(error));
    }
    else{
      next();
    }
  }
}

module.exports = validatorHandler;
