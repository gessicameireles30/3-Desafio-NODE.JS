import { AppDataSource } from '../../../database/data-source';
import { User } from '../../../database/entities/User';
import AppError from '../../middlewares/AppError';

class ListUserService {
  public async execute(): Promise<User[]> {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find({
      relations: ['reserve'],
    });

    if (users.length === 0) {
      throw new AppError(
        404,
        'Not Found',
        'Não há nenhum usuário cadastrado',
      );
    }

    return users;
  }
}

export default ListUserService;
