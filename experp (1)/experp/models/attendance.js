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
  period:{
    type:Number,
    default:true
  },
  subject:{
    type: String,
    default:true
  },
  date:{
    type : Date,
    default:true
  },
  absentees:{
    type : Schema.Types.Mixed ,
    default:true
  },
  presentees:{
    type : Schema.Types.Mixed ,
    default:true
  }
    });

module.exports = mongoose.model('dayattendance', userSchema);

/*userSchema.pre('save', async function(next) {
  if(){
    next()
  }else{
    return null;
  }
})*/
