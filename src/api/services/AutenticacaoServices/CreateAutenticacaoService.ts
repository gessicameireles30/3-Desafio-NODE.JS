import AppError from './middlewares/AppError';
import { compare } from 'bcryptjs';
import User from './database/entities/User'
import { sign } from 'jsonwebtoken';

interface IRequest {
  email: string;
  password: string;
}
class CreateAutenticacaoService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const user = await users.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    const passwordConfirmed = await compare(password, user.password);
    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    return user;
  }


}
export default CreateAutenticacaoService;
