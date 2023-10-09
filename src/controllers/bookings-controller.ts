import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { InputBookingBody } from '@/protocols';
import { bookingsService } from '@/services';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const booking = await bookingsService.getBookings(userId);

  res.status(httpStatus.OK).send(booking);
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body as InputBookingBody;

  const createdBooking = await bookingsService.createBooking(userId, roomId);

  res.status(httpStatus.OK).send(createdBooking);
}

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const bookingId = parseInt(req.params.bookingId);
  const { roomId } = req.body as InputBookingBody;

  const updatedBooking = await bookingsService.updateBooking(userId, bookingId, roomId);

  res.status(httpStatus.OK).send(updatedBooking);
}
