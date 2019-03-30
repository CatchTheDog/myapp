/**
 * @author mr.x
 * @since 2019/03/30 14:03
 * @version 1.0.0
 * logger implement by log4js
 */
const log4js = require('log4js');
const yaml = require('require-yml');
const configInfo = require('./config');
const path = require('path');
let logger = null;

/**
 *
 * 加载配置项，初始化日志配置
 */
function loggerInit(loggerName){
    try {
        const loggerConfig = yaml(path.join(__dirname,'../',configInfo['loggerconfigpath']));
        console.log(loggerConfig);
        log4js.configure(loggerConfig);
        logger = log4js.getLogger(loggerName);
    }catch (e) {
        console.error(e);
    }
};

module.exports = {
    trace:(info,prefix)=>{
        logger || loggerInit(prefix || 'app');
        logger.trace(info);
    },
    debug:(info,prefix)=>{
        logger || loggerInit(prefix || 'app');
        logger.debug(info);
    },
    info:(info,prefix)=>{
        logger || loggerInit(prefix || 'app');
        logger.info(info);
    },
    warn:(info,prefix)=>{
        logger || loggerInit(prefix || 'app');
        logger.warn(info);
    },
    error:(info,prefix)=>{
        logger || loggerInit(prefix || 'app');
        logger.error(info);
    },
    fatal:(info,prefix)=>{
        logger || loggerInit(prefix || 'app');
        logger.fatal(info);
    }
};

