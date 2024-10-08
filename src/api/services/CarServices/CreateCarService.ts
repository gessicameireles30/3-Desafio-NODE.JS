import { AppDataSource } from '../../../database/data-source';
import { Car } from '../../../database/entities/Car';
import AppError from '../../middlewares/AppError';


interface IRequest {
  model: string;
  color: string;
  year: number;
  valuePerDay: number;
  acessories: string[];
  numberOfPassengers: string;
}

class CreateCarService {
  public async execute(carData: IRequest): Promise<Car> {
    const carRepository = AppDataSource.getRepository(Car);

    if (carData.acessories.length === 0) {
      throw new AppError(
        400,
        'Bad Request',
        'É necessário ter pelo menos UM acessório',
      );
    }

    if (carData.year < 1950 && carData.year > 2023) {
      throw new AppError(
        400,
        'Bad Request',
        'Ano do carro inválido',
      );
    }

    const newCar = carRepository.create(
      carData
    );

    await carRepository.save(newCar);

    return newCar;
  }
}

export default CreateCarService;
