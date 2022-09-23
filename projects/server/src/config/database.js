const mysql = require("mysql");
const util = require('util');

const dbConfig = mysql.createPool({
	host: 'localhost',
	user: 'Luky',
	password: '@Jj4SMNnL280697',
	database: 'git_collab',
});

const dbQuery = util.promisify(dbConfig.query).bind(dbConfig);

module.exports = { dbConfig, dbQuery };