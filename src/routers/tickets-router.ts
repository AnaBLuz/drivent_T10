import { Router } from 'express';
import { authenticateToken, validateBody } from '../middlewares'
import { ticketsSchema } from '../schemas/ticket-schema'

const ticketsRouter = Router();

ticketsRouter
          .get("/types", authenticateToken, geyTicketTypes)
          .get("/types",authenticateToken, getTickets)
          .post("/",authenticateToken, validateBody(ticketsSchema), createTicket)