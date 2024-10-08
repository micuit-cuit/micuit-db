const Sequelize = require('sequelize');
module.exports = {
    Database: {//exemple of database config
        dialect: 'sqlite',
        storage: './db/database.sqlite',
        logging: false,
        define: {
            timestamps: true
        },
    },
    Model: {//exemple of model config
        user: {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            }
            //by default, the table name is equal to the model name, but you can change it with the tableName property
        },
        message: {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            content: {
                type: Sequelize.STRING,
                allowNull: false
            },
            from: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            to: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'user',
                    key: 'id'
                }
            }
        }
    }
};
