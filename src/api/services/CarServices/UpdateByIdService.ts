import { getRepository } from 'typeorm';

class CarService {

  async updateByIdService(id, updateData) {
    const carRepository = getRepository(Car);


    const car = await carRepository.findOne(id);
    if (!car) {
      throw new Error('Carro não encontrado');
    }

    Object.assign(car, updateData);
    await carRepository.save(car);

    return car;
  }
}

export default new CarService();
