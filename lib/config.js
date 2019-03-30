const yaml = require('require-yml');
const path = require('path');
console.log(path.join(__dirname,'..','/config/config.yml'));
module.exports = yaml(path.join(__dirname,'..','/config/config.yml'));
