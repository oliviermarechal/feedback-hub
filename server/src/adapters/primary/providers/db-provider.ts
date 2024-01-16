import AppConfig from '../../../app.config';
import {
    CamelCasePlugin,
    Kysely,
    ParseJSONResultsPlugin,
    PostgresDialect,
} from 'kysely';
import { Pool } from 'pg';
import { Database } from './database-types';

export const DbProvider = new Kysely<Database>({
    dialect: new PostgresDialect({
        pool: new Pool({
            database: AppConfig.database.name,
            host: AppConfig.database.host,
            user: AppConfig.database.user,
            password: AppConfig.database.password,
            port: 5432,
            max: 10,
            ssl:
                process.env.NODE_ENV === 'production'
                    ? { rejectUnauthorized: false }
                    : false,
        }),
    }),
    plugins: [new CamelCasePlugin(), new ParseJSONResultsPlugin()],
});
