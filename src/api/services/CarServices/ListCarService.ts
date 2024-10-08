import { AppDataSource } from '../../../database/data-source';
import { Car } from '../../../database/entities/Car';
import AppError from '../../middlewares/AppError';


class ListCarService {
  public async execute() {
    const carRepository = AppDataSource.getRepository(Car);
    const cars = await carRepository.find(
    );

    if (cars.length == 0) {
      throw new AppError(
        404,
        'Not found',
        'Não há nenhum carro cadastrado',
      );
    }

    return cars;
  }
}

export default ListCarService;
