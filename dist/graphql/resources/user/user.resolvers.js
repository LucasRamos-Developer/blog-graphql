"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = {
    User: {
        posts: (parent, { first = 20, offset = 0 }, { db_connection }, infor) => {
            return db_connection.Post
                .findAll({
                where: { author: parent.get('id') },
                limit: first,
                offset: offset
            });
        }
    },
    Query: {
        users: (parent, { first = 20, offset = 0 }, { db_connection }, infor) => {
            return db_connection.User.findAll({ limit: first, offset: offset });
        },
        user: (parent, { id }, { db_connection }, infor) => {
            return db_connection.User.findById(id)
                .then((user) => {
                if (!user)
                    throw new Error(`User with id ${id} not found in context!`);
                return user;
            });
        },
    },
    Mutation: {
        createUser: (parent, { input }, { db_connection }, infor) => {
            return db_connection.sequelize.transaction((t) => {
                return db_connection.User
                    .create(input, { transaction: t });
            });
        },
        updateUser: (parent, { id, input }, { db_connection }, infor) => {
            id = parseInt(id);
            return db_connection.sequelize.transaction((t) => {
                return db_connection.User.findById(id)
                    .then((user) => {
                    if (!user)
                        throw new Error(`User with id ${id} not found in context!`);
                    return user.update(input, { transaction: t });
                });
            });
        },
        updateUserPassword: (parent, { id, input }, { db_connection }, infor) => {
            id = parseInt(id);
            return db_connection.sequelize.transaction((t) => {
                return db_connection.User.findById(id)
                    .then((user) => {
                    if (!user)
                        throw new Error(`User with id ${id} not found in context!`);
                    return user.update(input, { transaction: t })
                        .then((user) => !!user);
                });
            });
        },
        deleteUser: (parent, { id }, { db_connection }, infor) => {
            id = parseInt(id);
            return db_connection.sequelize.transaction((t) => {
                return db_connection.User
                    .findById(id)
                    .then((user) => {
                    if (!user)
                        throw new Error(`User with id ${id} not found in context!`);
                    return user
                        .destroy({ transaction: t })
                        .then(user => !!user);
                });
            });
        }
    }
};
