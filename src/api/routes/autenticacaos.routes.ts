import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AutenticacaoController from '../controllers/autenticacaoController';
const autenticacaosRouter = Router();
const autenticacaoController = new AutenticacaoController();
autenticacaosRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  AutenticacaoController.create,
);
export default autenticacaosRouter;
