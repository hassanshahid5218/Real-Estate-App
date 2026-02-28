const exp=require('express');
const {signup,signin,handlegoogle}=require('../controller/auth controller.js')
const router=exp.Router();

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/google',handlegoogle)

module.exports=router