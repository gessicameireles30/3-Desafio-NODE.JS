import { AppDataSource } from '../../../database/data-source';
import { User } from '../../../database/entities/User';
import AppError from '../../middlewares/AppError';
import axios from 'axios';

interface IRequest {
  name: string;
  cpf: string;
  birth: string;
  cep: string;
  email: string;
  password: string;
}

interface IResponse {
  id: number;
  name: string;
  cpf: string;
  birth: string;
  cep: string;
  email: string;
  neighborhood: string;
  street: string;
  complement: string;
  city: string;
  uf: string;
  qualified: boolean;
}

class CreateUserService {
  public async execute({
    name,
    cpf,
    birth,
    cep,
    email,
    password,
  }: IRequest) {
    try {
      const userRepository = AppDataSource.getRepository(User);


      const cepData = await this.consultarCEP(cep);
      if (!cepData) {
        throw new AppError(400, 'Invalid CEP', 'O CEP informado é inválido.');
      }

      const user = userRepository.create({
        name,
        cpf,
        birth,
        cep,
        email,
        password,
        qualified: this.checkQualified(birth),
        neighborhood: cepData.bairro,
        street: cepData.logradouro,
        complement: cepData.complemento,
        city: cepData.localidade,
        uf: cepData.uf,
      });

      await userRepository.save(user);

      return user;
    } catch (error) {

      console.error('Erro ao criar usuário:', error);
      throw new AppError(500, 'Internal Server Error', error.message);
    }
  }

  private async consultarCEP(cep: string) {
    try {
      const cepFormatado = cep.replace(/\D/g, '');
      const response = await axios.get(`https://viacep.com.br/ws/${cepFormatado}/json/`);

      if (response.data.erro) {
        return null;
      }

      return response.data;
    } catch (error) {
      console.error('Erro ao consultar o CEP:', error);
      throw new AppError(500, 'Service Error', 'Erro ao consultar o serviço de CEP.');
    }
  }


  private checkQualified(birth: string): boolean {
    const birthDate = new Date(birth);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age >= 18;
  }
}

export default CreateUserService;
