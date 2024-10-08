import { Request, Response } from 'express';
import CreateAutenticacaoService from '../services/AutenticacaoServices/CreateAutenticacaoService';

export default class AutenticacaoController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createSession = new CreateAutenticacaoService();
    const user = await createSession.execute({
      email,
      password,
    });
    return response.json(user);
  }
}
