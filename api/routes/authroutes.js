const exp=require('express');
const {signup}=require('../controller/auth controller.js')
const router=exp.Router();

router.post('/signup',signup)

module.exports=router