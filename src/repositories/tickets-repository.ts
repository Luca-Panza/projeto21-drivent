import { TicketType, Ticket } from '@prisma/client';
import { prisma } from '@/config';

export type CreateTicket = Omit<Ticket, 'id'>;
export type CreateTicketForPost = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

async function getTicketTypes(): Promise<TicketType[]> {
  const result = prisma.ticketType.findMany();
  return result;
}

async function createTicket(ticket: CreateTicketForPost) {
  return prisma.ticket.create({
    data: {
      ...ticket,
    },
  });
}

async function findEnrollmentByUserId(userId: number) {
  return await prisma.enrollment.findUnique({
    where: {
      userId,
    },
  });
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  return await prisma.ticket.findUnique({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

export const ticketsRepository = { getTicketTypes, createTicket, findEnrollmentByUserId, findTicketByEnrollmentId };
