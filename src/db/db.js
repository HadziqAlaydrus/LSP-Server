const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'dapurbunda',
    password: 'jikku361',
    port: 5432
});

module.exports = pool;