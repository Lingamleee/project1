const admin = require("../model/adminModel");
const User = require("../model/studentModel");
const OnGoing = require("../model/onGoingModel");
const staff = require("../model/staffModel");
const bcrypt = require("bcrypt");

module.exports.adlogin = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    let ad = await admin.findOne({name});
    console.log(ad,"Hii admin");
    if (!ad)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, ad.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    ad.password = "";
    return res.json({ status: true, ad , msg:"Logged In Successfully"});
  } catch (ex) {
    next(ex);
  }
};

module.exports.adregister = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const usernameCheck = await admin.findOne({ name });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await admin.create({
      name,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.adgetAllUsers = async (req, res, next) => {  
  console.log("Hii",req.query.id);
  try {
    const users = await admin.find({ _id: { $ne: req.query.id } }).select([
      "name",
      "_id",
    ]);
    //add students also
    const students = await User.find({ _id: { $ne: req.query.id } }).select([
      "name",
      "_id",
    ]);

    const staffs = await staff.find({ _id: { $ne: req.query.id } });

    console.log(staffs);
    return res.json({users,students,staffs});
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

module.exports.getOnGoing = async (req, res, next) => {
  try {
    const onGoing = await OnGoing.find();   
    return res.json({ msg: "Ongoing", onGoing, status: true });
  } catch (ex) {
    next(ex);
  }
}

module.exports.setOnGoing = async (req, res, next) => {
  try {
    const { progress } = req.body;
    console.log(progress); 
    const onGoing = await OnGoing.findOneAndUpdate({id:1},{progress},{new:true});
    if(!onGoing){
      const onGoing = await OnGoing.create({progress});
    }
    return res.json(onGoing);
  } catch (ex) {
    next(ex);
  }
}

