import { DataSource } from 'typeorm';
import { Employee } from './models/typeorm/Employee';
import { Department } from './models/typeorm/Department';

const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  username: 'root',
  password: 'root',
  port: 5432,
  database: 'db-benchmarking-typeorm',
  entities: [Department, Employee],
  migrations: ['./dist/models/typeorm/migrations/*.js'],
  synchronize: true,
});

export const createConnection = async (): Promise<void> => {
  try {
    await appDataSource.initialize();
  } catch (error) {
    console.log(error);
  }
};

export { appDataSource };
