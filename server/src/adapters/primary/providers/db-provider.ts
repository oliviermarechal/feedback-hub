import { knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import AppConfig from '../../../app.config';

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
