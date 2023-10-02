import { prisma } from '@/config';

async function findHotels() {
  return await prisma.hotel.findMany();
}

async function findHotelId(id: number) {
  return await prisma.hotel.findUnique({ where: { id }, include: { Rooms: true } });
}

export const hotelsRepository = { findHotels, findHotelId };
