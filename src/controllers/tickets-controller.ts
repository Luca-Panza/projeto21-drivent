import { Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';
import { CreateTicket } from '@/repositories/tickets-repository';

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  const result = await ticketsService.getTicketTypes();
  res.status(httpStatus.OK).send(result);
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const result = await ticketsService.getTickets(req.userId);
  res.status(httpStatus.OK).send(result);
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body as CreateTicket;

  const result = await ticketsService.createTicket(req.userId, ticketTypeId);
  return res.status(httpStatus.CREATED).send(result);
}
