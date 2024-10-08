import { AppDataSource } from '../../../database/data-source';
import { Car } from '../../../database/entities/Car';
import AppError from '../../middlewares/AppError';

class ListCarService {
  public async execute(id: string): Promise<Car> {
    const carRepository = AppDataSource.getRepository(Car);

    if (!id.match(/^[0-9]+$/)) {
      throw new AppError(
        400,
        'Bad Request',
        'O ID fornecido está em um formato inválido'
      );
    }

    const car = await carRepository.findOne({
      where: { id },
      relations: ['accessories'],
    });

    if (!car) {
      throw new AppError(
        404,
        'Not Found',
        'Carro não encontrado'
      );
    }

    return car;
  }
}

export default ListCarService;
