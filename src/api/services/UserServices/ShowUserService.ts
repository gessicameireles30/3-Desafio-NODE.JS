import { AppDataSource } from '../../../database/data-source';
import { User } from '../../../database/entities/User';
import AppError from '../../middlewares/AppError';

class ListUserService {
  public async execute(id: string): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);

    if (!id.match(/^[0-9]+$/)) {
      throw new AppError(
        400,
        'Bad Request',
        'O ID fornecido está em um formato inválido'
      );
    }

    const user = await userRepository.findOne({
      where: { id: Number(id) },
      relations: ['accessories'],
    });


    if (!user) {
      throw new AppError(
        404,
        'Not Found',
        'Usuário não encontrado'
      );
    }

    return user;
  }
}

export default ListUserService;
