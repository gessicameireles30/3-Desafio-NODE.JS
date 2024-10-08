import { Router } from 'express';
import UserController from '../controllers/users.controller'
import { celebrate, Joi, Segments } from 'celebrate';

const usersRouter = Router();
const usersController = new UserController();

usersRouter.post(
  '/reserve/:reserve_id/cars',
  celebrate({
    [Segments.PARAMS]: {
      movie_id: Joi.number().required(),
    },
    [Segments.BODY]: {
      nome: Joi.string().required(),
      cpf: Joi.number().required(),
      birth: Joi.date().required(),
      cep: Joi.number().required(),
      email: Joi.string().required(),
      password: Joi.number().required(),
    },
  }),
  usersController.create,
);

usersRouter.put(
  '/reserve/:reserve_id/users/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
      reserve_id: Joi.number().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      cpf: Joi.number().required(),
      birth: Joi.date().required(),
      cep: Joi.number().required(),
      email: Joi.string().required(),
      password: Joi.number().required(),
    },
  }),
  usersController.update,
);

usersRouter.delete(
  '/reserve/:reserve_id/users/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
      reserve_id: Joi.number().required(),
    },
  }),
  usersController.delete,
);

export default usersRouter;
