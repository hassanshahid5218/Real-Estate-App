const listing=require('../models/listing model.js')

async function creatingList(req,res,next){
    try{
        console.log("REQ.USER:", req.user); // debug

    if (!req.user) {
      return res.status(401).json("User not authenticated");
    }

    const newListing = new listing({
      ...req.body,
      userRef: req.user.id || req.user._id, // 🔥 FIX
    });

    const savedListing = await newListing.save();

    return res.status(201).json(savedListing);
    }
    catch(error){
       next(error)
    }
}

module.exports={
    creatingList
}