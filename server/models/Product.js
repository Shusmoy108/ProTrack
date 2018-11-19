const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    product_name: String,
    task_number: Number,
    task: [
        {
            task_name: String,
            subtask: [
                {
                    subtask_name: String,
                    subtask_type: String,
                    subtask_option: []
                }
            ]
        }
    ]
});
ProductSchema.statics.getProduct = function(name, cb) {
    this.findOne({ product_name: name }, function(err, product) {
        if (err) cb(500, "Internal Server error", null);
        else {
            
            cb(200, null, product);
        }
    });
};

module.exports = mongoose.model("Product", ProductSchema);
