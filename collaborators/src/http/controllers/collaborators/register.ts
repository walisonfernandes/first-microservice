import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterCollaboratorUseCase } from '../../../use-cases/factories/make-register-collaborator-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerCollaboratorBodySchema = z.object({
    name: z.string(),
    cpf: z.string(),
    startAt: z.string(),
  })

  const { name, cpf, startAt } = registerCollaboratorBodySchema.parse(
    request.body,
  )

  try {
    const registerCollaboratorUseCase = makeRegisterCollaboratorUseCase()

    await registerCollaboratorUseCase.execute({
      name,
      cpf,
      startAt: new Date(startAt),
    })
  } catch (err) {
    // Tratar os erros
  }

  return reply.status(201).send()
}
