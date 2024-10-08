import { AppDataSource } from '../../../database/data-source';
import { Car } from '../../../database/entities/Car';
import AppError from '../../middlewares/AppError';


interface IRequest {
  id: string;
  model: string;
  color: string;
  year: number;
  valuePerDay: number;
  acessories: string[];
  numberOfPassengers: string;

}

class UpdateCarService {
  public async execute({
    id,
    model,
    color,
    year,
    valuePerDay,
    acessories,
    numberOfPassengers,


  }: IRequest): Promise<Car> {
    const carRepository = AppDataSource.getRepository(Car);
    const numberId = parseInt(id);

    // Buscar o carro pelo ID
    const car = await carRepository.findOneBy({ id: numberId });

    // Verificar se o carro existe
    if (!car) {
      throw new AppError(404, 'Not found', 'Não há carro com esse id');
    }

    // Verificar se o modelo do carro já existe, exceto o atual
    const carExist = await carRepository.findOneBy({ model });

    if (carExist && carExist.id !== car.id) {
      throw new AppError(400, 'Bad Request', 'O carro já está cadastrado');
    }

    // Validar ano
    if (year < 1950 || year > 2023) {
      throw new AppError(400, 'Bad Request', 'O ano de fabricação do carro deve estar entre 1950 e 2023');
    }

    // Verificar se há pelo menos um acessório
    if (acessories.length === 0) {
      throw new AppError(400, 'Bad Request', 'O carro deve ter pelo menos um acessório');
    }

    // Atualizar os campos do carro
    car.model = model;
    car.color = color;
    car.year = year;
    car.valuePerDay = valuePerDay;
    car.numberOfPassengers = numberOfPassengers;

    // Atualizar acessórios (garantir que não haja repetidos)
    const uniqueAcessories = Array.from(new Set(acessories.map(acc => acc.name)));
    car.acessories = uniqueAcessories.map(name => ({ name }));

    // Salvar o carro atualizado
    await carRepository.save(car);

    return car;
  }
}

export default UpdateCarService;
