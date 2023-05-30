import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const QTD_REGISTER = 600;
const prismaClient = new PrismaClient();

class Prisma {
  constructor() {}

  static async saveDepartment(): Promise<void> {
    const departments = [] as any;

    for (let i = 0; i < QTD_REGISTER; i++) {
      departments.push({
        name: faker.company.name(),
        description: faker.lorem.words(),
      });
    }

    await prismaClient.department.createMany({
      data: departments,
      skipDuplicates: true,
    });
  }

  static async saveEmployees(): Promise<void> {
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

  static async find(): Promise<void> {
    console.time('[Prisma] find all');

    await prismaClient.employee.findMany({
      include: {
        department: true,
      },
    });

    console.timeEnd('[Prisma] find all');
  }

  static async findWithLimit(): Promise<void> {
    console.time('[Prisma] find with limit 150');

    const teste = await prismaClient.employee.findMany({
      take: 150,
      include: {
        department: true,
      },
    });
    console.log(teste);
    console.timeEnd('[Prisma] find with limit 150');
  }

  static async delete(): Promise<void> {
    console.time('[PRISMA] delete');

    await prismaClient.employee.delete({ where: { id: Math.floor(Math.random() * 2000) + 1 } });

    console.timeEnd('[PRISMA] delete');
  }

  static async update(): Promise<void> {
    console.time('[PRISMA] update');

    await prismaClient.employee.update({ where: { id: Math.floor(Math.random() * 2000) + 1 }, data: { name: faker.person.fullName() } });

    console.timeEnd('[PRISMA] update');
  }
}

Prisma.update();
