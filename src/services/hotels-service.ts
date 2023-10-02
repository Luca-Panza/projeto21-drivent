import { paymentRequiredError, notFoundError } from '@/errors';
import { enrollmentRepository, ticketsRepository, hotelsRepository } from '@/repositories';

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  if (ticket.status !== 'PAID' || ticket.TicketType.isRemote === true || ticket.TicketType.includesHotel === false)
    throw paymentRequiredError();

  const hotels = await hotelsRepository.findHotels();
  if (hotels.length === 0) throw notFoundError();

  return hotels;
}

async function getHotelId(userId: number, hotelId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  if (ticket.status !== 'PAID' || ticket.TicketType.isRemote === true || ticket.TicketType.includesHotel === false)
    throw paymentRequiredError();

  const hotels = await hotelsRepository.findHotels();
  if (hotels.length === 0) throw notFoundError();

  const hotel = await hotelsRepository.findHotelId(hotelId);
  return hotel;
}

export const hotelsService = { getHotels, getHotelId };
