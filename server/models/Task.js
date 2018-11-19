const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
        task_name:String,
        subtask:[{
            subtask_name:String,
            subtask_type:String,
            subtask_option:[]
        }]
});
module.exports = mongoose.model('Task', TaskSchema);