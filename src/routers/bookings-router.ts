import { Router } from 'express';
import { getBooking, createBooking, updateBooking } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { bookingSchema } from '@/schemas';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getBooking)
  .post('/', validateBody(bookingSchema), createBooking)
  .put('/:bookingId', updateBooking);

export { bookingRouter };
