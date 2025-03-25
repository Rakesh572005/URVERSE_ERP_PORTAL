const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  rollno: {
    type: String,
    required: true
  },
  sname: {
    type: String,
    default: true
  },
  dob:{
    type:Date,
    default:true
  },
  fathername:{
    type:String,
    defaullt:true
  },
  cgpa:{
    type:Number,
    defaullt:true
  },
  mothername:{
    type:String,
    defaullt:true
  },
  branch:{
    type:String,
    default:true
  },
  sem:{
    type:Number,
    default:true
  },
  year:{
    type:Number,
    default:true
  },
  section:{
    type:String,
    default:true
  },
  emailid:{
    type:String,
    default:true
  },
  address:{
    type:String,
    default:true
  }
});

module.exports = mongoose.model('studentdetails', userSchema);