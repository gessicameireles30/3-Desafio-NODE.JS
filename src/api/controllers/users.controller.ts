import { Request, Response } from 'express';
import CreateUserService from '../services/UserServices/CreateUserService';
import UpdateUserService from '../services/UserServices/UpdateUserService';
import DeleteUserService from '../services/UserServices/DeleteUserService';
import ListUserService from '../services/UserServices/ListUserService';
import ShowUserService from '../services/UserServices/ShowUserService';

export default class UserController {
  public async index(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listUsers = new ListUserService();

    const user = await listUsers.execute();

    return response.json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUser = new ShowUserService();

    const user = await showUser.execute(id);

    return response.json(user);
  }

  public async create(
    request: Request,
    response: Response,
  ): Promise<Response> {


    const createuser = new CreateUserService();

    const user = await createuser.execute(
      request.body
    );
    return response.json(user);
  }

  public async update(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({
      id,
      ...request.body

    });

    return response.json(user);
  }

  public async delete(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteUser = new DeleteUserService();

    await deleteUser.execute(id);

    return response.sendStatus(204);
  }
}
