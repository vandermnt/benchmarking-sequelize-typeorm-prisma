import { faker } from '@faker-js/faker';
import { appDataSource, createConnection } from './data-source';
import { Employee } from './models/typeorm/Employee';
import { Department } from './models/typeorm/Department';

const QTD_REGISTER = 600;

const employeeRepository = appDataSource.getRepository(Employee);
const departmentRepository = appDataSource.getRepository(Department);

class Typeorm {
  constructor() {}

  static async saveDepartment(): Promise<void> {
    const departments = [] as any;
    for (let i = 0; i < QTD_REGISTER; i++) {
      departments.push({ name: faker.company.name(), description: faker.lorem.words() });
    }

    departmentRepository.create(departments);
    await departmentRepository.save(departments);
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

    const teste = await employeeRepository.find({
      take: 150,
      relations: {
        department: true,
      },
    });
    console.timeEnd('[TYPEORM] find all with limit 150');
  }

  static async delete(): Promise<void> {
    console.time('[TYPEORM] delete');

    await employeeRepository.delete(Math.floor(Math.random() * (4000 - 1200 + 1)) + 1200);

    console.timeEnd('[TYPEORM] delete');
  }

  static async update(): Promise<void> {
    console.time('[TYPEORM] update');

    await employeeRepository.update({ id: Math.floor(Math.random() * (4000 - 1200 + 1)) + 1200 }, { name: faker.person.fullName() });

    console.timeEnd('[TYPEORM] update');
  }
}

(async () => {
  await createConnection();
  await Typeorm.update();
})();
