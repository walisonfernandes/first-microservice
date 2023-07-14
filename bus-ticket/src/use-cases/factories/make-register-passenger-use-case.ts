import { PrismaPassengersRepository } from '../../repositories/prisma/prisma-passengers-repository'
import { PassengerUseCase } from '../register-passenger'

export function makeRegisterPassengerUseCase() {
  const passengersRepository = new PrismaPassengersRepository()
  const useCase = new PassengerUseCase(passengersRepository)

  return useCase
}
