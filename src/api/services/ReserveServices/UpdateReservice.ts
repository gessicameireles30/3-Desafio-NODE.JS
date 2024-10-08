import { AppDataSource } from '../../../database/data-source';
import { Reserve } from '../../../database/entities/Reserve';
import AppError from '../../middlewares/AppError';

interface IRequest {
  id: string;
  user_id: string;
  car_id: string;
  startDate: string;
  endDate: string;
}

interface IResponse {
  id: number;
  user_id: number;
  startDate: string;
  endDate: string;
}

class UpdateReserveService {
  public async execute({
    id,
    user_id,
    car_id,
    startDate,
    endDate,

  }: IRequest): Promise<IResponse> {
    const reserveRepository = AppDataSource.getRepository(Reserve);
    const numberCarId = parseInt(car_id);
    const numberUserId = parseInt(user_id);
    const numberId = parseInt(id);

    const reserve = await reserveRepository.findOneBy({
      id: numberId,
      user: { id: numberUserId, movie: { id: numberCarId } },
    });

    if (!reserve) {
      throw new AppError(404, 'Not Found', 'Esse ticket não existe');
    }



    const result: IResponse = {
      id: Number(id),
      user_id: Number(user_id),
      startDate: startDate,
      endDate: endDate,
    };

    return result;
  }
}

export default UpdateReserveService;
