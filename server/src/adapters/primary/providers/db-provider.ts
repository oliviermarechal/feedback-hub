import { knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import AppConfig from '../../../app.config';
import {
    CamelCasePlugin,
    Kysely,
    ParseJSONResultsPlugin,
    PostgresDialect,
} from 'kysely';
import { Pool } from 'pg';
import { Database } from './database-types';

const DBProvider = knex({
    client: 'pg',
    connection: {
        host: AppConfig.database.host,
        port: 5432,
        user: AppConfig.database.user,
        password: AppConfig.database.password,
        database: AppConfig.database.name,
        ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false,
    },
    ...knexSnakeCaseMappers(),
});

export default DBProvider;

export const DbKysely = new Kysely<Database>({
    dialect: new PostgresDialect({
        pool: new Pool({
            database: AppConfig.database.name,
            host: AppConfig.database.host,
            user: AppConfig.database.user,
            password: AppConfig.database.password,
            port: 5432,
            max: 10,
        }),
    }),
    plugins: [new CamelCasePlugin(), new ParseJSONResultsPlugin()],
});
