const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    teacherid:{
        type:String,
        default:true
    },
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
  srollno:{
    type: String,
    default:true
  },
  remarks:{
    type : Schema.Types.Mixed ,
    default:true
  }
});

module.exports = mongoose.model('attendancepermission', userSchema);