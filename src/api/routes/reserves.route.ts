import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ReservesController from '../controllers/reserves.controller';

const reservesRouter = Router();
const reservesController = new ReservesController();

reservesRouter.post(
  '/cars/:car_id/user/:users_id/reserve',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.number().required(),
      car_id: Joi.number().required(),
    },
    [Segments.BODY]: {
      starDate: Joi.date().required(),
      endDate: Joi.date().required(),
    },
  }),
  reservesController.create,
);

reservesRouter.put(
  '/cars/:car_id/users/:user_id/reserves/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
      user_id: Joi.number().required(),
      car_id: Joi.number().required(),
    },
    [Segments.BODY]: {
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
    },
  }),
  reservesController.update,
);

reservesRouter.delete(
  '/cars/:car_id/users/:user_id/reserves/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
      user_id: Joi.number().required(),
      car_id: Joi.number().required(),
    },
  }),
  reservesController.delete,
);

export default reservesRouter;
