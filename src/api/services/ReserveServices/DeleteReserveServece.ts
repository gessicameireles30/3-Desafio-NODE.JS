import { AppDataSource } from '../../../database/data-source';
import { Reserve } from '../../../database/entities/Reserve';
import AppError from '../../middlewares/AppError';

interface IRequest {
  id: string;
  user_id: string;

}

class DeleteReserveService {
  public async execute({
    id,
    user_id,

  }: IRequest): Promise<void> {
    const reserveRepository = AppDataSource.getRepository(Reserve);
    const numberId = parseInt(id);
    const numberUserId = parseInt(user_id);


    const reserve = await reserveRepository.findOneBy({
      id: numberId


    });

    if (!reserve) {
      throw new AppError(404, 'Not found', 'Esse reserve não existe');
    }

    await reserveRepository.remove(reserve);
  }
}

export default DeleteReserveService;
