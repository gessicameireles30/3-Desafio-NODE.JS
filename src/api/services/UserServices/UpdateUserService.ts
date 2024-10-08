import { AppDataSource } from '../../../database/data-source';
import { User } from '../../../database/entities/User';
import AppError from '../../middlewares/AppError';

interface IRequest {
  id: number;
  name: string;
  cpf: number;
  birth: Date;
  cep: string;
  email: string;
  password: string;
}

interface IResponse {
  id: number;
  name: string;
  cpf: number;
  birth: Date;
  cep: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute(
    update: IRequest) {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({
      update.id
  
    });

    if (!user) {
      throw new AppError(400, 'Bad Request', 'Essa user não existe');
    }

  

   return await userRepository.save({
    
    
   });

  }
}

export default UpdateUserService;
