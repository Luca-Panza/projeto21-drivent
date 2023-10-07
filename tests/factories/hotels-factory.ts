import { prisma } from "@/config";
import faker from "@faker-js/faker";

export async function createHotel() {
    return await prisma.hotel.create({
        data: {
            image: faker.image.imageUrl(),
            name: faker.name.middleName()
        }
    })
}

export async function createRoomWithHotelId(hotelId: number) {
    return prisma.room.create({
      data: {
        name: '1020',
        capacity: 3,
        hotelId: hotelId,
      },
    });
  }