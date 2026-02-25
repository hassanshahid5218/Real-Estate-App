const exp=require('express')
const {test}=require('../controller/user controller')
const router=exp.Router()

router.get('/test',test)

module.exports=router