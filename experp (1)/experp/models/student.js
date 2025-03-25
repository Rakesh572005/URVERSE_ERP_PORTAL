const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    sroll: { 
        type: String, 
        required: true 
    },
    date: {
         type: String, 
        required: true 
    },
    dayOrder: { 
        type: String, 
        required: true 
    },
    hour: { 
        type: Number, 
        required: true 
    },
    subject: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        required: true
    },
  });
  
module.exports = mongoose.model('period', attendanceSchema);