const LOG = require('mi-log');
const log = new LOG([{ style: 'circle', color: 'yellow', text: 'micuit-db' }]);
const fs = require('fs');
const Sequelize = require('sequelize');
/*
    je veux un user.get(), user.set(), user.remove(),
    un systheme de model
*/
//crée un fichier de config a la racine du projet en micuit-db.config.js
const racine = process.cwd();
if (!fs.existsSync(racine + '/micuit-db.config.js')) {
    log.e('micuit-db.config.js not found, auto-creation');
    fs.writeFileSync(racine + '/micuit-db.config.js', fs.readFileSync(__dirname + '/default-config.js'));
}
const config = require(racine + '/micuit-db.config.js');
let syncronized = false;
//crée une instance de sequelize
const sequelize = new Sequelize(config.Database.name, config.Database.username, config.Database.password, {
    dialect: config.Database.dialect || 'sqlite',
    storage: config.Database.storage || './db/database.sqlite',
    logging: config.Database.logging || false,
    define: config.Database.define
});
// charger les models
const models = {};
for (let model in config.Model) {
    log.i('loading model:', model);
    const modelConfig = config.Model[model];
    log.i('modelConfig:', modelConfig);
    models[model] = sequelize.define(model, modelConfig, {
        tableName: modelConfig.tableName ?? model,
    });
    log.i('model:', models[model], 'created');
}
async function sync() {
    for (let model in models) {
        await models[model].sync();
    }
    syncronized = true;
}
//sync les models
module.exports = {
    sequelize: sequelize,
    models: models,
    sync: sync
};