const listing=require('../models/listing model.js')

async function creatingList(req,res,next){
    try{
       const Listing=await listing.create(req.body);
       return res.status(201).json(Listing);
    }
    catch(error){
       next(error)
    }
}

module.exports={
    creatingList
}