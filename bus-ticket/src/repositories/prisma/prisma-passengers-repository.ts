import { Prisma, Passenger } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { PassengersRepository } from '../passengers-repository'

export class PrismaPassengersRepository implements PassengersRepository {
  async findById(id: string): Promise<Passenger | null> {
    const passenger = await prisma.passenger.findUnique({
      where: {
        id,
      },
    })

    return passenger
  }

  async findByCPF(cpf: string): Promise<Passenger | null> {
    const passenger = await prisma.passenger.findUnique({
      where: {
        cpf,
      },
    })

    return passenger
  }

  async create(
    data: Prisma.PassengerUncheckedCreateInput,
  ): Promise<Passenger> {
    const passenger = await prisma.passenger.create({
      data,
    })

    return passenger
  }
}
