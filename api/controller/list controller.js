const listing=require('../models/listing model.js');
const errorhandler = require('../utills/errors.js');

async function creatingList(req,res,next){
    try{
        console.log("REQ.USER:", req.user); // debug

    if (!req.user) {
      return res.status(401).json("User not authenticated");
    }

    const newListing = new listing({
      ...req.body,
      userRef: req.user.id || req.user._id, 
    });

    const savedListing = await newListing.save();

    return res.status(201).json(savedListing);
    }
    catch(error){
       next(error)
    }
}

async function deleteListing(req,res,next){
   const Listing=await listing.findById(req.params.id)
   if(!Listing){
    return next(errorhandler(404,"Listing not found"));
   }
   if(req.user.id!==Listing.userRef){
    return next(errorhandler(404,"You can delete only your own listing"))
   }
   try{
      await listing.findOneAndDelete(req.params.id)
      res.status(200).json("Deleted Successfully")
   }
   catch(error){
        next(error)
   }
}

async function updateListing(req,res,next){
   const Listing=await listing.findById(req.params.id)
   if(!Listing){
    return next(errorhandler(404,"Listing not found"));
   }
   if(req.user.id!==Listing.userRef){
    return next(errorhandler(404,"You can update only your own listing"))
   } 
   try{

   }
   catch{
    const updatedList=await listing.findByIdAndUpdate(req.params.id,
        req.params.body,
        {new:true}
    )
    res.status(200).json(updatedList)
   }
}

module.exports={
    creatingList,deleteListing,updateListing
}