const exp=require('express')
const router=exp.Router()
const {creatingList,deleteListing,updateListing}=require('../controller/list controller.js')
const { verifyToken } = require('../utills/verifyuser.js')
router.post('/create',verifyToken,creatingList)
router.delete('/delete/:id',verifyToken,deleteListing)
router.post('/update/:id',verifyToken,updateListing)

module.exports=router