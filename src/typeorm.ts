import { faker } from '@faker-js/faker';
import { appDataSource } from './data-source';
import { Employee } from './models/typeorm/Employee';

const QTD_REGISTER = 600;
appDataSource.initialize();
const employeeRepository = appDataSource.getRepository(Employee);

class Typeorm {
  constructor() {}

  static async saveDepartment(): Promise<void> {
    const department = [] as any;

    for (let i = 0; i < QTD_REGISTER; i++) {
      department.push({
        name: faker.company.name(),
        description: faker.lorem.words(),
      });
    }

    employeeRepository.create(department);
    await employeeRepository.save(department);
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

    console.time('[TYPEORM] save many records');

    employeeRepository.create(employees);
    await employeeRepository.save(employees);

    console.timeEnd('[TYPEORM] save many records');
  }

  static async find(): Promise<void> {
    console.time('[TYPEORM] find all');

    await employeeRepository.find({
      relations: {
        department: true,
      },
    });

    console.timeEnd('[TYPEORM] find all');
  }

  static async findWithLimit(): Promise<void> {
    console.time('[TYPEORM] find all with limit 150');

    await employeeRepository.find({
      take: 150,
      relations: {
        department: true,
      },
    });

    console.timeEnd('[TYPEORM] find all with limit 150');
  }

  static async delete(): Promise<void> {
    console.time('[TYPEORM] delete');

    await employeeRepository.delete(Math.floor(Math.random() * 500) + 1);

    console.timeEnd('[TYPEORM] delete');
  }

  static async update(): Promise<void> {
    console.time('[TYPEORM] update');

    await employeeRepository.update({ id: Math.floor(Math.random() * 500) + 1 }, { name: faker.person.fullName() });

    console.timeEnd('[TYPEORM] update');
  }
}

Typeorm.find();
