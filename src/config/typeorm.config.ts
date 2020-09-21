import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from "@nestjs/typeorm";


dotenv.config()

const {
  PG_HOST,
  PG_USERNAME,
  PG_PASSWORD,
  PG_DATABASE,
  PG_PORT,
} = process.env

const typeOrmConfig : TypeOrmModuleOptions = {
  type: 'postgres',
  name: 'default',
  host: PG_HOST,
  port: Number(PG_PORT),
  username: PG_USERNAME,
  password: PG_PASSWORD,
  database: PG_DATABASE,
  entities: [__dirname + '/../**/*.entity.{js,ts}']
}

export = typeOrmConfig;
