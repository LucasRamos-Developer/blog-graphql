import * as filesystem from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';

import { DbConnection } from '../interfaces/DbConnectionInterface';

const _basename: string = path.basename(module.filename);
const _env: string = process.env.NODE_ENV || 'development';

let config = require(path.resolve(`${__dirname}./../config/config.json`))[_env];
let database = null;

// Singleton
if (!database) {
  database = {};

  const sequelize: Sequelize.Sequelize = new Sequelize(config.database, config.username, config.password, config);

  const imports_files = filesystem.readdirSync(__dirname).filter((file: string) => {
    return (file.indexOf('.') !== 0) && (file !== _basename) && (file.slice(-3) === '.js');
  });

 

  imports_files.forEach((file: string) => {
    const model = sequelize.import(path.join(__dirname, file));
    database[model['name']] = model;
  });

  // Estranho mas precisa para poder associar todos os MOdels
  Object.keys(database).forEach((key: string) => {
    if (database[key].associate) {
      database[key].associate(database);
    }
  });

  database['sequelize'] = sequelize;
}

export default <DbConnection>database;