const exp=require('express')
const {test,updateuserinfo,deleteuser

}=require('../controller/user controller')
const { verifyToken } = require('../utills/verifyuser')
const router=exp.Router()

router.get('/test',test)
router.post('/update/:id',verifyToken,updateuserinfo)
router.delete('/delete/:id',verifyToken,deleteuser)

module.exports=router