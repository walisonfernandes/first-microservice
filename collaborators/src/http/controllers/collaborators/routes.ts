import { FastifyInstance } from 'fastify'
import { register } from './register'

export async function collaboratorRoutes(app: FastifyInstance) {
  app.post('/collaborators', register)
}
