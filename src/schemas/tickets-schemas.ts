import Joi from 'joi';
import { CreateTicket } from '@/repositories';

export const createTicketSchema = Joi.object<CreateTicket>({
  ticketTypeId: Joi.number().required(),
});
