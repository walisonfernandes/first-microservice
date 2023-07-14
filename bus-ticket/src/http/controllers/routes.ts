import { FastifyInstance } from 'fastify'
import { register } from './register'

export async function passengerRoutes(app: FastifyInstance) {
  app.post('/passengers', register)
}
