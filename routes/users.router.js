const express = require('express');

const UserService = require('./../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/user.schema');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res, next)=>{
  try{
    const users = await service.find();
    res.status(200).json(users);
  }
  catch (error){
    next(error);
  }
});

router.get('/filter', async (req, res)=>{
  res.status(200).json({
    message : 'Estamos en una ruta especifica',
  });
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next)=>{
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next)=>{
    try{
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  });

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next)=>{
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  });

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next)=>{
    try{
      const { id } = req.params;
      const respuesta = await service.delete(id);
      res.status(200).json(respuesta);
    }
    catch (error){
      next(error);
    }
  });


module.exports = router;
