import { TicketStatus } from '@prisma/client';
import { notFoundError } from '@/errors';
import { ticketsRepository } from '@/repositories';

async function getTicketTypes() {
  const tickets = await ticketsRepository.getTicketTypes();
  return tickets;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollment = await ticketsRepository.findEnrollmentByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticketData = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  };

  await ticketsRepository.createTicket(ticketData);

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  return ticket;
}

async function getTickets(userId: number) {
  const enrollment = await ticketsRepository.findEnrollmentByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  return ticket;
}

const ticketsService = { getTicketTypes, createTicket, getTickets };

export default ticketsService;
