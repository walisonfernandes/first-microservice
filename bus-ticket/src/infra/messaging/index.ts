import 'dotenv/config';

import { kafka } from "./kafka/kafka"
import { PassengerUseCase } from '../../use-cases/register-passenger';
import { PrismaPassengersRepository } from '../../repositories/prisma/prisma-passengers-repository';

interface PassengersMessage {
  collaborator: {
    collaboratorId: string,
    name: string,
    cpf: string,
  }
}

async function main() {
  const consumer = kafka.consumer({ groupId: 'passenger-group', allowAutoTopicCreation: true })

  await consumer.connect()
  
  await consumer.subscribe({ topic: 'collaborators.new-collaborator' })

  await consumer.run({
    eachMessage: async ({ message }) => {
      const passengerJSON = message.value?.toString();

      if (!passengerJSON) {
        return;
      }

      const passenger: PassengersMessage = JSON.parse(passengerJSON);

      const prismaPassengerRepository = new PrismaPassengersRepository()

      const passengerUseCase = new PassengerUseCase(
        prismaPassengerRepository
      )

      await passengerUseCase.execute({
        name: passenger.collaborator.name,
        cpf: passenger.collaborator.cpf,
        collaboratorId: passenger.collaborator.collaboratorId,
      })

      console.log(`[Bus-ticket] Created passenger ${passenger.collaborator.name} to ${passenger.collaborator.cpf}`)
    },
  })
}

main().then(() => {
  console.log('[Bus-ticket] Listening to Kafka messages')
})