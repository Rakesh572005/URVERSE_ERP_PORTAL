const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentrollnos = new Schema({
    sem: { 
        type: Number, 
        required: true 
    },
    year: {
         type: Number, 
        required: true 
    },
    branch:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    classteacherid:{
        type:String,
        required:true
    },
    classteacher:{
        type:String,
        required:true
    },
    rollnos: { 
        type : Schema.Types.Mixed, 
        required: true 
    }
  });
  
module.exports = mongoose.model('Studentrollno', studentrollnos);