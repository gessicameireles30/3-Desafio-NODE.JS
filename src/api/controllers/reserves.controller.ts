import { Request, Response } from 'express';
import CreateReserveService from '../services/ReserveServices/CreateReserveService';
import UpdateReserveService from '../services/ReserveServices/UpdateReservice';
import DeleteReserveService from '../services/ReserveServices/DeleteReserveServece';
import ListReserveService from '../services/ReserveServices/ListReserveService';
import ShowReserveService from '../services/ReserveServices/ShowReserveService';

export default class CarsController {
  public async index(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listReserves = new ListReserveService();

    const reserve = await listReserves.execute();

    return response.json(reserve);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showReserve = new ShowReserveService();

    const reserve = await showReserve.execute(id);

    return response.json(reserve);
  }

  public async create(
    request: Request,
    response: Response,
  ): Promise<Response> {


    const createReserve = new CreateReserveService();

    const reserve = await createReserve.execute(
      request.body
    );
    return response.json(reserve);
  }

  public async update(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const updateReserve = new UpdateReserveService();

    const reserve = await updateReserve.execute({
      id,
      ...request.body

    });

    return response.json(reserve);
  }

  public async delete(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteReserve = new DeleteReserveService();

    await deleteReserve.execute(id);

    return response.sendStatus(204);
  }
}
