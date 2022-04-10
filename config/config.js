// config.js

require('dotenv').config();
const {DB, DB_HOST, DB_USERNAME, DB_PASSWORD} = process.env;
module.exports=
{ "development": {
  "username": "root",
  "password": "",
  "database": "chatbotdb",
  "host": "localhost",
  "dialect": "mysql"
},
"test": {
  "username": "root",
  "password": null,
  "database": "chatbotdb",
  "host": "127.0.0.1",
  "dialect": "mysql"
},
"production": {
  "username": "root",
  "password": null,
  "database": "chatbotdb",
  "host": "127.0.0.1",
  "dialect": "mysql"
},
}