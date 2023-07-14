import { CollaboratorsRepository } from '../repositories/collaborators-repository'
import { Collaborator } from '@prisma/client'
import { MessagingAdapter } from "../../src/application/adapters/messaging-adapter";

interface RegisterCollaboratorUseCaseRequest {
  name: string
  cpf: string
  startAt: Date
}

interface RegisterCollaboratorUseCaseResponse {
  collaborator: Collaborator
}

export class RegisterCollaboratorUseCase {
  constructor(private collaboratorsRepository: CollaboratorsRepository,
    private messagingAdapter: MessagingAdapter,
    ) {}

  async execute({
    name,
    cpf,
    startAt,
  }: RegisterCollaboratorUseCaseRequest): Promise<RegisterCollaboratorUseCaseResponse> {
    const userWithSameCPF = await this.collaboratorsRepository.findByCPF(cpf)

    if (userWithSameCPF) {
      throw new Error('CPF already exists')
    }

    const collaborator = await this.collaboratorsRepository.create({
      name,
      cpf,
      start_at: startAt,
    })

    await this.messagingAdapter.sendMessage('collaborators.new-collaborator', {
      collaborator: {
        collaboratorId: collaborator.id,
        name: collaborator.name,
        cpf: collaborator.cpf,
      }
    })

    return {
      collaborator,
    }
  }
}
