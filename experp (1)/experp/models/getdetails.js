const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  sem:{
    type:Number,
    default:true
  },
  year:{
    type:Number,
    default:true
  },
  branch:{
    type:String,
    default:true
  },
  students:[{
    studentid:{
    type:String,
    default:true
  },
  studentname:{
    type:String,
    default:true
  }

}]
});

module.exports = mongoose.model('semwisedetail', userSchema);