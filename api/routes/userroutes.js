const exp=require('express')
const {test,updateuserinfo

}=require('../controller/user controller')
const { verifyToken } = require('../utills/verifyuser')
const router=exp.Router()

router.get('/test',test)
router.post('/update/:id',verifyToken,updateuserinfo)

module.exports=router