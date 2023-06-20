const User = require("../model/staffModel");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');

module.exports.sflogin = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, password } = req.body;
    const user = await User.findOne({ regno: name });
    console.log(user);
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    if (password !== user.password)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user, msg:"Logged In Successfully" }); 
  } catch (ex) {
    next(ex);
  }
};

const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'gmail'
  auth: {
    user: 'raechelinfantablessy@gmail.com',
    pass: 'tcff baab jitr baql',
  },
});

module.exports.sfmultiregister = async (req, res, next) => {
    const { staffs} = req.body.emailData;
    console.log(staffs);

    const mailPromises = staffs.map(async (staff) => {  
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      delay(10000);    
      const { Email, Name, Regno } = staff;      
      const usernameCheck = await User.findOne({regno:Regno});
      if (usernameCheck)
        console.log("Username already exists");
      else{

      const mailOptions = {
        from: 'raechelinfantablessy@gmail.com',
        to: Email,
        subject: "hey" + Name + "hii",
        text: "hey"+ Email + "hii",
      };
      this.sfregister( staff, res, next);
      return transporter.sendMail(mailOptions);
      }
    });    



    Promise.all(mailPromises)
    .then(() => {
      res.status(200).json({ message: 'Emails sent successfully', status: true});
    })
    .catch((error) => {
      console.error('Error sending emails:', error);
      res.status(500).json({ error: 'An error occurred while sending emails', details: error });
    });
}

module.exports.sfregister = async (req, res, next) => {
  try {
    const { Name, Email, Regno , Phone, Experience, position} = req;
      const user = await User.create({
        regno: Regno,
        name: Name,
        email: Email,
        phone: Phone,
        experience: Experience,
        position: position,
      });
      console.log("Registered",user);
  } catch (ex) {
    next(ex);
  }
};

module.exports.sfgetAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.sfsetAvatar = async (req, res, next) => {
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

module.exports.sflogOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

module.exports.sfgetAvail = async (req, res, next) => {
  console.log("hiii lee",req.query);
  try {    
    const { id } = req.query;
    console.log("hiii",id);
    if(!id) return res.json({ msg: "User id is required " });
    const data = await User.findById(id);

    return res.json({ msg: "Request added successfully.",data: data, avail: data.availability});

  } catch (ex) {
    next(ex);
  }
}

