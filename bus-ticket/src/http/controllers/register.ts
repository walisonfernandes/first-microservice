import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterPassengerUseCase } from '../../use-cases/factories/make-register-passenger-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerPassengerBodySchema = z.object({
    name: z.string(),
    cpf: z.string(),
    collaboratorId: z.string()
  })

  const { name, cpf, collaboratorId } = registerPassengerBodySchema.parse(
    request.body,
  )

  try {
    const registerCollaboratorUseCase = makeRegisterPassengerUseCase()

    await registerCollaboratorUseCase.execute({
      name,
      cpf,
      collaboratorId,
    })
  } catch (err) {
    // Tratar os erros
  }

  return reply.status(201).send()
}
