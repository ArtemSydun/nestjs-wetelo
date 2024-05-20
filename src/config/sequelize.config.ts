import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from 'src/modules/users/user.model';

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [User],
  autoLoadModels: true,
  synchronize: true,
};

console.log(process.env.DB_USERNAME);
