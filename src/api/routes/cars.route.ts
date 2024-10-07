import { Router } from 'express';
import CarsController from '../controllers/cars.controller';
import { celebrate, Joi, Segments } from 'celebrate';

const carsRouter = Router();
const carsController = new CarsController();

carsRouter.get('/', carsController.index);

carsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  carsController.show,
);

carsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      actors: Joi.array().items(Joi.string()).required(),
      genre: Joi.string().required(),
      release_date: Joi.date().required(),
    },
  }),
  carsController.create,
);

carsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      actors: Joi.array().items(Joi.string()).required(),
      genre: Joi.string().required(),
      release_date: Joi.date().required(),
    },
  }),
  carsController.update,
);

carsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  carsController.delete,
);

export default carsRouter;
