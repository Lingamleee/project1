const request = require("../model/requestedModel");
const User = require("../model/studentModel");
const Staff = require("../model/staffModel");

module.exports.getRequests = async (req, res, next) => {
    try {
        const { id } = req.query;
        //send all senders details to the receiver
        // findall
        const requests = await request.find({ receiver: id }).lean();
        const senderIds = requests.flatMap((request) => request.sender.map((senderId) => senderId.toString()));
        const data = await User.find({ _id: { $in: senderIds } });
        return res.json({ data });
    } catch (ex) {
        next(ex);
    }
}

module.exports.acceptRequest = async (req, res, next) => {
    const {staff, student} = req.body;
    //update the accepted array in request
    const findRequest = await request.findOne({ receiver: staff });
    if (!findRequest) return res.json({ msg: "Request not found" });
    const checkStudent = findRequest.accepted.includes(student);
    if (checkStudent) return res.json({ msg: "Request already accepted" });
    findRequest.accepted.push(student);
    await findRequest.save();
    //remove from the sender array
    const findSender = await request.findOne({ sender: student });
    const index = findSender.sender.indexOf(staff);
    findSender.sender.splice(index, 1);
    await findSender.save();
    //update the student array in staff
    const findStaff = await Staff.findById(staff); 
    findStaff.student.push(student);
    await findStaff.save();
    //reduce the availability of the staff
    await Staff.findByIdAndUpdate(staff, { $inc: { availability: -1 } });
    //update guide in student
    const s1 = await User.findByIdAndUpdate(student, { $set: { guide: staff }});
    console.log(s1); 
    //send mail to the sender
    const subject = "Request accepted";
    const text = `Your request has been accepted by ${findStaff.name}. Please check your dashboard.`;
    await sendMail(s1.email, subject, text);
    return res.json({ msg: "Request accepted successfully." });
}  

module.exports.addRequest = async (req, res, next) => {
    try {
        const { sender, receiver, message, title } = req.body;
        //update message and title in user
        const user = await User.findByIdAndUpdate(sender, { $set: { message }, $set: { title }});
        //send mail to the receiver
        const subject = "Request for the appointment";
        const text = `You have a request from ${user.name} for the appointment. Please check your dashboard.`;
        await sendMail(user.email, subject, text);
        const findSender = await request.findOne({ receiver});
        if (!findSender) {
            const data = await request.create({ sender, receiver});
            if (data) return res.json({ msg: "Request added successfully." });
            else return res.json({ msg: "Failed to add request to the database" });
        }
        const checkReceiver = findSender.sender.includes(sender);
        if (checkReceiver) return res.json({ msg: "Request already sent" });
        findSender.sender.push(sender);
        await findSender.save();
        res.json({ msg: "Request added successfully." });
    } catch (ex) {
        next(ex);
    }
}

// send mail to the receiver function

const nodemailer = require("nodemailer");
const sendMail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'raechelinfantablessy@gmail.com',
                pass: 'tcff baab jitr baql',
            },
        });
        const host = "http://192.168.1.4:3000/Staff"
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            //send host link to the receiver
            text: text+host,
        };
        const result = await transporter.sendMail(mailOptions);
        return result;
    } catch (ex) {
        return ex;
    }
}
