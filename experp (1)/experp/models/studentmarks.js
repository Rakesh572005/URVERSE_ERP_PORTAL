const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentmarksSchema = new Schema({
    sroll: { 
        type: String, 
        required: true 
    },
    sname: {
         type: String, 
        required: true 
    },
    sem: { 
        type: Number, 
        required: true 
    },
    year:{ 
        type:Number , 
        required: true 
    },
    branch:{
        type:String,
        required:true
    },
    marks: { 
        type: Schema.Types.Mixed , 
        required: true 
    }
  });
  
module.exports = mongoose.model('studentmark', studentmarksSchema );