const User = require("../model/studentModel");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');

module.exports.stlogin = async (req, res, next) => {
  try {
    const { regno, password } = req.body;
    console.log(regno);
    console.log(password); 
    const user = await User.findOne({ regno});
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

module.exports.stmultiregister = async (req, res, next) => {
    const { students} = req.body.emailData;
    console.log(students);

    const mailPromises = students.map(async (student) => {  
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      delay(10000);    
      const { Email, Name, Regno } = student;
      
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
      this.stregister( student, res, next);
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

module.exports.stregister = async (req, res, next) => {
  try {
    const { Name, Email, Regno } = req;
      const user = await User.create({
        regno: Regno,
        name: Name,
        email: Email,
      });
      console.log("Registered",user);
  } catch (ex) {
    next(ex);
  }
};

module.exports.stgetStudent = async (req, res, next) => {
  try {
    const id = req.query.id;
    if (!id) return res.json({ msg: "User id is required " });
    console.log("id: ",id);
    const students = await User.findOne({_id: id});
    console.log(students);
    return res.json({status: true, students});
  } catch (ex) {
    next(ex);
  }
};


module.exports.stgetAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
      "regno"
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.stsetAvatar = async (req, res, next) => {
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

module.exports.stlogOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

//get all students

module.exports.stgetAllStudents = async (req, res, next) => {
  try {
    const students = await User.find({});
    return res.json({status: true, students});
  } catch (ex) {
    next(ex);
  }
}