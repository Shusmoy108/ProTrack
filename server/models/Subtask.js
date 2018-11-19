const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubtaskSchema = new Schema({
        subtask_name:String,
        subtask_type:String,
        subtask_option:[]
});
module.exports = mongoose.model('Subtask', SubtaskSchema);