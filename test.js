const LOG = require('mi-log');
const log = new LOG([{ style: 'circle', color: 'red', text: 'test' }]);
const fs = require('fs');
const micuitDb = require('./db');
//sync les models
(async () => {
    await micuitDb.sync();

    //list all models
    log.i('models:', micuitDb.models);
    const user = micuitDb.models.user
    const message = micuitDb.models.message
    //ajoute 2 users
    const Alice = await user.create({ name: 'Alice', email: 'Alice@test.com' });
    const Bob = await user.create({ name: 'Bob', email: 'Bob@test.com' });
    log.i('Alice:', { id: Alice.id, name: Alice.name, email: Alice.email });
    log.i('Bob:', { id: Bob.id, name: Bob.name, email: Bob.email });
    //ajoute un message de Alice a Bob
    log.i('message:',{content: 'Hello Bob', from: Alice.id, to: Bob.id});
    const firstMessage = await message.create({ content: 'Hello Bob', from: Alice.id, to: Bob.id });
    //l'utilisateur 2 recoit un message a l'utilisateur 1
    const userTo = await user.findByPk(firstMessage.to)
    const userFrom = await user.findByPk(firstMessage.from)
    const secondMessage = await message.create({ content: 'Hello Alice', from: userTo.id, to: userFrom.id });
    log.i('firstMessage:', { content: firstMessage.content, from: userFrom.name, to: userTo.name });
    log.i('secondMessage:', { content: secondMessage.content, from: userTo.name, to: userFrom.name });
})();



