import { Passenger, Prisma } from '@prisma/client'

export interface PassengersRepository {
  findById(id: string): Promise<Passenger | null>
  findByCPF(cpf: string): Promise<Passenger | null>
  create(data: Prisma.PassengerUncheckedCreateInput): Promise<Passenger>
}
