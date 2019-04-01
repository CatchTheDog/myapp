const ConnectionPool = require('../db/connectpool');
const config = require('../lib/config');
const logger = require('../lib/logger');

//创建mongoConnector
let mongoURL = config.getValueByKey('mongoURL');
let opts = {
    max: 10,
    min: 2
};
let connectionPool = new ConnectionPool(mongoURL, opts);
let connectPromise = connectionPool.getConnectionPool().acquire();
connectPromise.then(connector => {
    let db = connector.db('my_app');
    db.createCollection('test').then(collection => {
        logger.info('create collection test success.', 'MyApp');
        let docs = [
            {
                a: 1,
                b: 2,
                c: 3
            },
            {
                d: 4,
                e: 5,
                f: 6
            }
        ];
        collection.insertMany(docs).then(result => {
            connectionPool.release(connector);
            if (result.result){
                logger.info(`insert data to test result:${JSON.stringify(result.result)}`);
            }
        }, err => {
            logger.error(`insert data to test error:${err}`);
        });
    }, err => {
        logger.error(`create collection test error:${err}`);
    });
}).catch(err=>{
    logger.error(`handle mongodb connector err:${err}`);
}).finally(()=>{
    connectionPool.destroy();
});
