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
  branch:{
    type:String,
    default:true
  },
  section:{
    type:String,
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
  sname:{
    type: String,
    default:true
  },
  teacherid:{
    type:String,
    defaullt:true
  },
  remarks:{
    type : Schema.Types.Mixed ,
    default:true
  }
    });

module.exports = mongoose.model('studentremark', userSchema);