import { Router } from 'express';
import carsRouter from '../api/routes/cars.route';
import usersRouter from '../api/routes/users.route';
import reserveRouter from '../api/routes/reserves.route';

const routes = Router();

routes.use('/v1/cars', carsRouter);
routes.use('/v1/users', usersRouter);
routes.use('/v1/reserve', reserveRouter);

export default routes;
