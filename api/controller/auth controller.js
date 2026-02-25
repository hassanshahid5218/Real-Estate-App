const User=require('../models/user model.js')
const bcryptjs=require('bcryptjs')
const errorhandler=require('../utills/errors')


// async function signup(req,res,next) {
//     const {username,email,password}=req.body;
//     if (!username || !email || !password) {
//       return next(errorhandler(400, "All fields are required"));
//     }
//     const hasspassword=bcryptjs.hashSync(password,10)
//     const newUser= new User({username,email,password:hasspassword});
//     try{
//     await newUser.save();
//     res.status(201).json("User create successfully")}
//     catch(err){
//         next(err);
//     }
// }

async function signup(req, res, next) {
  try {
    console.log("REQ BODY:", req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(errorhandler(400, "All fields are required"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorhandler(409, "User already exists"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });

  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    next(err);
  }
}

module.exports={
    signup
}