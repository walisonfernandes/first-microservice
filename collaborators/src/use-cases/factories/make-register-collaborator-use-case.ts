import { RegisterCollaboratorUseCase } from '../register-collaborator'
import { PrismaCollaboratorsRepository } from '../../repositories/prisma/prisma-collaborators-repository'
import { KafkaMessagingAdapter } from '../../http/messaging/kafka/adapters/kafka-messaging-adapter'

export function makeRegisterCollaboratorUseCase() {
  const collaboratorsRepository = new PrismaCollaboratorsRepository()
  const kafkaMessagingAdapter = new KafkaMessagingAdapter()
  const useCase = new RegisterCollaboratorUseCase(collaboratorsRepository, kafkaMessagingAdapter)

  return useCase
}
