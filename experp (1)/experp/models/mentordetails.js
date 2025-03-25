const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    mname: {
        type: String,
        default: true
    },
    mdesg: {
        type: String,
        default: true
    },
    mphoneno: {
        type: String,
        default: true,
    },
    branch: {
        type: String,
        default: true
    },
    rollnos: {
        type: Schema.Types.Mixed,
        default: true
    }
});

module.exports = mongoose.model('mentordetail', userSchema);