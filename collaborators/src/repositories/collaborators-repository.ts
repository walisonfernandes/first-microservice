import { Collaborator, Prisma } from '@prisma/client'

export interface CollaboratorsRepository {
  findById(id: string): Promise<Collaborator | null>
  findByCPF(cpf: string): Promise<Collaborator | null>
  create(data: Prisma.CollaboratorUncheckedCreateInput): Promise<Collaborator>
}
