const exp=require('express');
const {signup,signin}=require('../controller/auth controller.js')
const router=exp.Router();

router.post('/signup',signup)
router.post('/signin',signin)

module.exports=router