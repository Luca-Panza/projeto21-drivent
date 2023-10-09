import { TicketStatus } from '@prisma/client';
import { forbiddenError, notFoundError } from '@/errors';
import { bookingsRepository, enrollmentRepository, ticketsRepository } from '@/repositories';

async function getBookings(userId: number) {
  await validateBooking(userId);

  const bookings = await bookingsRepository.findBookings(userId);
  if (!bookings) throw notFoundError();

  const getBooking = {
    id: bookings.id,
    Room: bookings.Room,
  };

  return getBooking;
}

async function createBooking(userId: number, roomId: number) {
  await validateBooking(userId);
  await checkCapacityRoom(roomId);

  const bookings = await bookingsRepository.createBooking(userId, roomId);

  const createdBooking = {
    bookingId: bookings.id,
    Room: bookings.Room,
  };

  return createdBooking;
}

async function updateBooking(userId: number, bookingId: number, roomId: number) {
  await validateBooking(userId);
  await checkCapacityRoom(roomId);

  const userBooking = await bookingsRepository.findBookings(userId);
  if (!userBooking || userBooking.id !== bookingId) throw forbiddenError();

  const booking = await bookingsRepository.updateBooking(bookingId, roomId);

  const updatedBooking = {
    bookingId: booking.id,
    Room: booking.Room,
  };

  return updatedBooking;
}

async function validateBooking(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw forbiddenError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw forbiddenError();

  if (ticket.status === TicketStatus.RESERVED) {
    throw forbiddenError();
  }

  const type = ticket.TicketType;

  if (type.isRemote || !type.includesHotel) {
    throw forbiddenError();
  }
}

async function checkCapacityRoom(roomId: number) {
  const room = await bookingsRepository.checkingRoomId(roomId);
  if (!room) throw notFoundError();
  if (room.capacity <= room.Booking.length) throw forbiddenError();
}

export const bookingsService = {
  createBooking,
  getBookings,
  updateBooking,
};
