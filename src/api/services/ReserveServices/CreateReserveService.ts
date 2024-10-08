import { AppDataSource } from '../../../database/data-source';
import { Reserve } from '../../../database/entities/Reserve';
import { User } from '../../../database/entities/User';
import { Car } from '../../../database/entities/Car';
import AppError from '../../middlewares/AppError';
import dayjs from 'dayjs';

interface IRequest {
  car_id: number;
  user_id: number;
  startDate: string;
  endDate: string;
}

interface IResponse {
  id: number;
  user_id: number;
  startDate: string;
  endDate: string;
  finalValue: string;
  car_id: number;
}

class CreateReserveService {
  public async execute({
    car_id,
    user_id,
    startDate,
    endDate,
  }: IRequest): Promise<IResponse> {
    const reserveRepository = AppDataSource.getRepository(Reserve);
    const carRepository = AppDataSource.getRepository(Car);
    const userRepository = AppDataSource.getRepository(User);

    const start = dayjs(startDate, 'DD/MM/YYYY');
    const end = dayjs(endDate, 'DD/MM/YYYY');

    // Validar se as datas são válidas e se a data de início é anterior à de término
    if (!start.isValid() || !end.isValid()) {
      throw new AppError(400, 'Datas inválidas.');
    }
    if (start.isAfter(end)) {
      throw new AppError(400, 'A data de início deve ser anterior à data de término.');
    }

    // Buscar o usuário e validar se ele existe
    const user = await userRepository.findOneBy({ id: user_id });
    if (!user) {
      throw new AppError(404, 'Usuário não encontrado.');
    }

    // Verificar se o usuário tem mais de 18 anos
    const userAge = dayjs().diff(dayjs(user.birthDate), 'year');
    if (userAge < 18) {
      throw new AppError(400, 'Usuário deve ter mais de 18 anos para reservar um carro.');
    }

    // Buscar o carro e validar se ele existe
    const car = await carRepository.findOneBy({ id: car_id });
    if (!car) {
      throw new AppError(404, 'Carro não encontrado.');
    }

    // Verificar se o carro já está reservado nesse período
    const conflictingCarReservation = await reserveRepository.findOne({
      where: {
        carId: car_id,
        startDate: start.toDate(),
        endDate: end.toDate(),
      },
    });
    if (conflictingCarReservation) {
      throw new AppError(400, 'Este carro já está reservado no período selecionado.');
    }

    // Verificar se o usuário já tem uma reserva no mesmo período
    const conflictingUserReservation = await reserveRepository.findOne({
      where: {
        userId: user_id,
        startDate: start.toDate(),
        endDate: end.toDate(),
      },
    });
    if (conflictingUserReservation) {
      throw new AppError(400, 'Você já possui uma reserva para este período.');
    }

    // Calcular o valor final com base no valor por dia do carro
    const numberOfDays = end.diff(start, 'day') + 1;
    const finalValue = (car.valuePerDay * numberOfDays).toFixed(2);

    // Criar a reserva
    const reserve = reserveRepository.create({
      user,
      car,
      startDate: start.toDate(),
      endDate: end.toDate(),
      finalValue: parseFloat(finalValue),
    });

    await reserveRepository.save(reserve);

    // Retornar a resposta formatada
    const result: IResponse = {
      id: reserve.id,
      user_id: user.id,
      startDate: start.format('DD/MM/YYYY'),
      endDate: end.format('DD/MM/YYYY'),
      finalValue: finalValue,
      car_id: car.id,
    };

    return result;
  }
}

export default CreateReserveService;
