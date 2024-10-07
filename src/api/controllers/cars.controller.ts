import { Request, Response } from 'express';
import ListCarService from '../services/CarServices/ListCarService';
import ShowCarService from '../services/CarServices/ShowCarService';
import CreateCarService from '../services/CarServices/CreateCarService';
import UpdateCarService from '../services/CarServices/UpdateCarService';
import DeleteCarService from '../services/CarServices/DeleteCarService';

export default class CarsController {
  public async index(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listCars = new ListCarService();

    const car = await listCars.execute();

    return response.json(car);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCar = new ShowCarService();

    const car = await showCar.execute(id);

    return response.json(car);
  }

  public async create(
    request: Request,
    response: Response,
  ): Promise<Response> {


    const createCar = new CreateCarService();
    console.log("entrou");
    const car = await createCar.execute(
      request.body
    );
    return response.json(car);
  }

  public async update(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const updateCar = new UpdateCarService();

    const car = await updateCar.execute({
      id,
      ...request.body

    });

    return response.json(car);
  }

  public async delete(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteCar = new DeleteCarService();

    await deleteCar.execute({ id });

    return response.sendStatus(204);
  }
}
