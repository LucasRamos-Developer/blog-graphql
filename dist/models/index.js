"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filesystem = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const _basename = path.basename(module.filename);
const _env = process.env.NODE_ENV || 'development';
let config = require(path.resolve(`${__dirname}./../config/config.json`))[_env];
let database = null;
// Singleton
if (!database) {
    database = {};
    const sequelize = new Sequelize(config.database, config.username, config.password, config);
    const imports_files = filesystem.readdirSync(__dirname).filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== _basename) && (file.slice(-3) === '.js');
    });
    imports_files.forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        database[model['name']] = model;
    });
    // Estranho mas precisa para poder associar todos os MOdels
    Object.keys(database).forEach((key) => {
        if (database[key].associate) {
            database[key].associate(database);
        }
    });
    database['sequelize'] = sequelize;
}
exports.default = database;
