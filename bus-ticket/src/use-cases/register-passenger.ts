import { PassengersRepository } from '../repositories/passengers-repository'

interface PassengerRequest {
    name: string
    cpf: string
    collaboratorId: string
}

export class PassengerUseCase {
  constructor(
    private passengersRepository: PassengersRepository,
  ) {}

  async execute(request: PassengerRequest): Promise<void> {
    console.log(request)

    await this.passengersRepository.create({
        name: request.name,
        cpf: request.cpf,
        name_bus: 'test',
        quantity: 2,
        collaboratorsId: request.collaboratorId,
    })
  }
}