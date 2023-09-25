import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicketSchema } from '@/schemas';
import { getTickets, getTicketTypes, createTicket } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketTypes)
  .get('/', getTickets)
  .post('/', validateBody(createTicketSchema), createTicket);

export { ticketsRouter };
