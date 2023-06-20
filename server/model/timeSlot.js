const mongoose = require('mongoose');

const TimeSlotSchema = new mongoose.Schema();

const YourSchema = new mongoose.Schema({
  timeSlot: {
    type: [{
      time: {
        type: String,
      },
      staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        default: null
      },
      staffName: {
        type: String,
        default: null
      },
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        default: null
      },
      studentName: {
        type: String,
        default: null
      },
      isAvailable: {
        type: Boolean,
        default: true
      }
    }],
    required: true
  },
  date:{
    type: Date,
    required: true,
  },
  process:{
    type: String,
    required: true,
  }
});

const Time = mongoose.model('time', YourSchema);

module.exports = Time;

