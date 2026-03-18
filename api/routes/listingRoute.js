const exp=require('express')
const router=exp.Router()
const {creatingList}=require('../controller/list controller.js')
const { verifyToken } = require('../utills/verifyuser.js')
router.post('/create',verifyToken,creatingList)

module.exports=router