const genericPool = require('generic-pool');
const mongodb = require('mongodb');

/**
 * 连接池工厂类
 */
class ConnectionFactory {
    constructor(mongoURL) {
        this.mongoURL = mongoURL;
    }

    create() {
        return mongodb.MongoClient.connect(this.mongoURL);
    }

    destroy(connection) {
        connection.close();
    }
}

/**
 * 连接池
 */
class ConnectionPool {
    /**
     * 连接池构造器
     * @param connection  数据库连接
     * @param opts  连接池配置参数，同 generic-pool createPool opt参数
     */
    constructor(mongoURL, opts) {
        this.connectionFactory = new ConnectionFactory(mongoURL);
        this.connectionPool = genericPool.createPool(this.connectionFactory, opts);
    }

    /**
     * 获取连接池
     * @returns {*|Pool}
     */
    getConnectionPool() {
        return this.connectionPool;
    }

    /**
     * 将连接归还连接池
     * @param connector
     */
    release(connector) {
        this.connectionPool.release(connector);
    }

    /**
     * 归还连接并销毁该连接
     * @param connector
     */
    destroyConnector(connector) {
        this.connectionPool.destroy(connector);
    }

    /**
     * 从连接池获取一个连接，使用此连接完成customerTask,在task完成后执行pool.release()或者pool.destroy
     * @param customTask 自定义任务
     * @returns {Promise}
     */
    use(customTask) {
        return this.connectionPool.use(customTask);
    }

    /**
     * 整个应用不再使用连接池时关闭连接池
     */
    destroy() {
        this.connectionPool.drain().then(() => this.connectionPool.clear());
    }

}

module.exports = ConnectionPool;