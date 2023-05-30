import { faker } from '@faker-js/faker';
import {} from 'typeorm';
import { appDataSource } from './data-source';
import { Employee } from './models/typeorm/Employee';

const QTD_REGISTER = 600;
appDataSource.initialize();
const employeeRepository = appDataSource.getRepository(Employee);

class Typeorm {
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

    console.time('[TYPEORM] save many records');

    employeeRepository.create(employees);
    employeeRepository.save(employees);
    console.timeEnd('[TYPEORM] save many records');
  }

  static async find() {
    console.time('[TYPEORM] find all');

    await employeeRepository.find({
      relations: {
        department: true,
      },
    });

    console.timeEnd('[TYPEORM] find all');
  }

  static async findWithLimit() {
    console.time('[TYPEORM] find all with limit');

    await employeeRepository.find({
      take: 20,
    });

    console.timeEnd('[TYPEORM] find all with limit');
  }
}

Typeorm.find();
