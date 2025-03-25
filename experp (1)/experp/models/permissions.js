const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  year:{
    type: Number,
    default:true
  },
  sem:{
    type: Number,
    default:true
  },
  date:{
    type : Date,
    default:true
  },
  branch:{
    type:String,
    default:true
  },
  permissions:{
    type : Schema.Types.Mixed ,
    default:true
  }
    });

module.exports = mongoose.model('attendancepermission', userSchema);