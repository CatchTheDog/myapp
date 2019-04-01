const express = require('express');
const router = express.Router();
const logger = require('../lib/logger');
//中间件
router.use((req,res,next)=>{
    logger.info(`request to login router,req:${req}`);
    next(); //需要调用next以将控制权传递给下一个组件
});
/**
 * 获取登录页面
 */
router.get('/index',(req,res,next)=>{
    let data = {title:'myapp',message:'您尚未登录，请登录！'};//页面渲染数据
    res.render('login',data);
});
/**
 * 提交登录信息
 */
router.post('/submit',(req,res,next)=>{
    let username = req.body.userName;
    let userPassword = req.body.userPassword;
    if (username === 'majq' && userPassword === '123456'){
        logger.info(`login success,username:${req.body.userName},userPS:${req.body.userPassword}`);
        res.render('index',{title:'myapp',message:'login success!'});
    }else{
        res.render('login',{title:'myapp',message:'账号或密码错误，请重新登录'})
    }
});

module.exports = router;
