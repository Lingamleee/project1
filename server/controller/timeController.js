const timeSlo = require("../model/timeSlot");
const OnGoing = require("../model/onGoingModel");

//create date only

module.exports.createDate = async (req, res, next) => {
    try {
        const { date } = req.body;
        //find process in ongoing model
        const process = await OnGoing.findOne({});
        console.log(process);
        const isFree = await timeSlo.findOne({ date });
        if (isFree) return res.json({ msg: "Date already added" });
        const timeSlot = new timeSlo({
            date: date,
            process: process.progress,
        });
        const savedTime = await timeSlot.save();
        res.json({ message: 'Date added successfully' });
    } catch (error) {
        next(error);
    }
}

module.exports.addTimeSlot = async (req, res, next) => {
    try {
        const { time, date } = req.body;
        console.log(time, date);
        const isFree = await timeSlo.findOne({ date }).then((data) => {
            if (data) {
                const isFree = data.timeSlot.find((t) => t.time === time);
                return isFree;
            }
        });
        if (isFree) return res.json({ msg: "Time slot already added"});
        const t = await timeSlo.findOne({date});
        if(!t){
        console.log(t);
        console.log("hii");
        }else{
            t.timeSlot.push({time: time, staff: null,student: null, isAvailable: true});
            await t.save();
            console.log("hello");
        }
      
        return res.json({ message: 'Time slot added successfully' });
        } catch (error) {
          next(error);
        }
}

module.exports.getTimeSlot = async (req, res, next) => {
    try {
        const { date } = req.body;
        const data = await timeSlo.find({ date });
        if (!data) return res.json({ msg: "No time slot found" });
        return res.json({ data });
    } catch (ex) {
        next(ex);
    }
}

module.exports.getAllTimeSlot = async (req, res, next) => {
    try {
        const pro = await OnGoing.findOne({});
        const process = pro.progress;
        const data = await timeSlo.find({ process});
        if (!data) return res.json({ msg: "No time slot found" });
        return res.json({ data });
    } catch (ex) {
        next(ex);
    }
}

module.exports.deleteTimeSlot = async (req, res, next) => {
    try {
        const { time, date } = req.body;
        const isFree = await timeSlo.findOne({ date }).then((data) => {
            if (data) {
                const isFree = data.timeSlot.find((t) => t.time === time);
                return isFree;
            }
        });
        if (!isFree) return res.json({ msg: "Time slot not found" });
        await timeSlo.findByIdAndDelete(isFree._id);
        return res.json({ msg: "Time slot deleted successfully" });
    } catch (ex) {
        next(ex);
    }
}

module.exports.setTimeSlot = async (req, res, next) => {
    try {
        const { time, date, staff, student, staffName, studentName} = req.body;
        const isFree = await timeSlo.findOne({ date }).then((data) => {
            if (data) {
                const isFree = data.timeSlot.find((t) => t.time === time);
                return isFree;
            }
        });
        if (!isFree.isAvailable) return res.json({ msg: "Time slot not found" });
        // find and update
        const time1 = await timeSlo.findOneAndUpdate(
            { date, "timeSlot.time": time },
             { $set: 
                { 
                    "timeSlot.$.staff": staff,
                    "timeSlot.$.student": student,
                    "timeSlot.$.isAvailable": false,
                    "timeSlot.$.staffName": staffName,
                    "timeSlot.$.studentName": studentName,
                } 
            });
    
        return res.json({ msg: "Time slot set successfully" });
    } catch (ex) {
        next(ex);
    }
}

//setFree

module.exports.setFree = async (req, res, next) => {
    try {
        const { time, date} = req.body;
        const isFree = await timeSlo.findOne({ date }).then((data) => {
            if (data) {
                const isFree = data.timeSlot.find((t) => t.time === time);
                return isFree;
            }
        });
        if (isFree.isAvailable) return res.json({ msg: "Time slot not found" });
        // find and update
        const time1 = await timeSlo.findOneAndUpdate(
            { date, "timeSlot.time": time },
            { $set:
                {
                    "timeSlot.$.staff": null,
                    "timeSlot.$.student": null,
                    "timeSlot.$.isAvailable": true,
                    "timeSlot.$.staffName": null,
                    "timeSlot.$.studentName": null,
                }
            }
        );

        return res.json({ msg: "Time slot set successfully" });
    } catch (ex) {
        next(ex);
    }
}

module.exports.getFree = async (req, res, next) => {
    try {
        const { date } = req.body;
        const data = await timeSlo.find({ date, isAvailable: true });
        if (!data) return res.json({ msg: "No time slot found" });
        return res.json({ data });
    } catch (ex) {
        next(ex);
    }
}