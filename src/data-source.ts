import { DataSource } from 'typeorm';

const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  username: 'root',
  password: 'root',
  port: 5432,
  database: 'db-benchmarking-typeorm',
});

export { appDataSource };
