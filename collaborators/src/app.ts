import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from '../env'
import { collaboratorRoutes } from './http/controllers/collaborators/routes'

export const app = fastify()

app.register(collaboratorRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO Here we should log to an external toal like Datalog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
