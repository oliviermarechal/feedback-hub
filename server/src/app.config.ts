if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();
}

const AppConfig = {
    secretKey: process.env.SECRET_KEY || 'secret',
    database: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
    },
    port: Number(process.env.PORT),
};

export default AppConfig;
