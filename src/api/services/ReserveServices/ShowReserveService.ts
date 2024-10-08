import { AppDataSource } from '../../../database/data-source';
import { User } from '../../../database/entities/User';
import AppError from '../../middlewares/AppError';

class ShowUserService {
  public async execute(user_id: number): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);

    // Busca o usuário pelo ID e carrega suas reservas, se houver
    const user = await userRepository.findOne({
      where: { id: user_id },
      relations: ['reserve'], // Assumindo que a entidade User tem uma relação chamada 'reserve'
    });

    // Verifica se o usuário foi encontrado
    if (!user) {
      throw new AppError(
        404,
        'Not Found',
        'Usuário não encontrado',
      );
    }

    return user; // Retorna o usuário encontrado
  }
}

export default ShowUserService;
