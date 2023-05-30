import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const QTD_REGISTER = 600;
const prismaClient = new PrismaClient();

class Prisma {
  constructor() {}

  static async save() {
    const employees = [] as any;

    for (let i = 0; i < QTD_REGISTER; i++) {
      employees.push({
        name: faker.person.fullName(),
        birthDate: faker.date.birthdate(),
        cpf: faker.number.int({ max: 8 }),
        phone: faker.number.int({ max: 8 }),
        department_id: Math.floor(Math.random() * 500) + 1,
      });
    }

    console.time('[Prisma] save many records');

    await prismaClient.employee.createMany({
      data: employees,
      skipDuplicates: true,
    });

    console.timeEnd('[Prisma] save many records');
  }

  static async find() {
    console.time('[Prisma] find all');

    await prismaClient.employee.findMany({
      include: {
        department: true,
      },
    });

    console.timeEnd('[Prisma] find all');
  }

  static async findWithLimit() {
    console.time('[Prisma] find all with limit');

    await prismaClient.employee.findMany({
      take: 50,
    });

    console.timeEnd('[Prisma] find all with limit');
  }
}

Prisma.find();
