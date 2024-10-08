import { AppDataSource } from '../../../database/data-source';
import { Reserve } from '../../../database/entities/Reserve';
import AppError from '../../middlewares/AppError';


class ListReserveService {
  public async execute() {
    const reserveRepository = AppDataSource.getRepository(Reserve);
    const reserves = await reserveRepository.find({
      relations: { user: true },
    });

    if (reserves.length == 0) {
      throw new AppError(
        404,
        'Not found',
        'Não há nenhum reserve cadastrado',
      );
    }

    return reserves;

  }
}

export default ListReserveService;
