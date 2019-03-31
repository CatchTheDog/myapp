const yaml = require('require-yml');
const path = require('path');

/**
 * 配置文件读取类
 * @author mr.x
 * @since 2019/03/31 13:11
 * @version 1.0.0
 */
class Config {
    constructor(configPath) {
        this.configPath = configPath;
        this.composePath = path.join(__dirname, '..', this.configPath);
        this.configInfo = this._load(this.composePath);
    }

    _load(configPath) {
        return yaml(configPath);
    }

    /**
     * 根据指定路径重新加载配置文件
     * @param configPath 相对于项目根目录的配置文件路径
     */
    load(configPath) {
        this.configPath = configPath;
        this.composePath = path.join(__dirname, '..', this.configPath);
        this.configInfo = this._load(this.composePath);
    }

    /**
     * 根据key值获取对应的value值
     * @param key
     * @returns {*}
     */
    getValueByKey(key) {
        return this.configInfo[key];
    }
}

module.exports = new Config('/config/config.yml');
