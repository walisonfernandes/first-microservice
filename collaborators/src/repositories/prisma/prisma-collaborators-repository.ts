import { Prisma, Collaborator } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import {
  CollaboratorsRepository,
} from '../collaborators-repository'

export class PrismaCollaboratorsRepository implements CollaboratorsRepository {
  async findById(id: string): Promise<Collaborator | null> {
    const collaborator = await prisma.collaborator.findUnique({
      where: {
        id,
      },
    })

    return collaborator
  }

  async findByCPF(cpf: string): Promise<Collaborator | null> {
    const collaborator = await prisma.collaborator.findUnique({
      where: {
        cpf,
      },
    })

    return collaborator
  }

  async create(
    data: Prisma.CollaboratorUncheckedCreateInput,
  ): Promise<Collaborator> {
    const collaborator = await prisma.collaborator.create({
      data,
    })

    return collaborator
  }
}
