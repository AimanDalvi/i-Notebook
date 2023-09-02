const mongoose= require('mongoose');
const { Schema } = mongoose;



const ReminderSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    
    rtitle:{
        type: String,
        required:true
    },
    remindAt:{
        type: String,
        required:true
    },
    isReminded:{
        type: Boolean,
        required:true
    },
});
const Reminder = mongoose.model('reminder', ReminderSchema); 
module.exports = Reminder