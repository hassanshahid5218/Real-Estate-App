const exp=require('express')
const router=exp.Router()
const {creatingList,deleteListing}=require('../controller/list controller.js')
const { verifyToken } = require('../utills/verifyuser.js')
router.post('/create',verifyToken,creatingList)
router.delete('/delete/:id',verifyToken,deleteListing)

module.exports=router