const express = require('express');
const subtaskRouter = express.Router();
const Subtask = require('../models/Subtask');
const passport = require('passport');
require('../settings/passport')(passport);


subtaskRouter.post('/create', passport.authenticate('jwt', { session: false}), function(req, res) {
    var subtask_name=req.body.subtaskname;
    var subtask_type=req.body.subtasktype;
    var subtask_option=[];
    if(subtask_type==="Dropdown" || subtask_type==="Checkbox")
        subtask_option=req.body.subtaskoption;
    console.log(subtask_name);
    var s= new Subtask();
    s.subtask_name=subtask_name;
    s.subtask_type=subtask_type;
    s.subtask_option=subtask_option;
    s.save(function (err) {
        if (err) return handleError(err);
        Subtask.find({} , function(err, subtasks) {
            if (err) throw err;
            console.log(subtasks);
            return res.json({success: true, authorized: true, user: req.user, subtasks:subtasks});
        });

    });


});
subtaskRouter.post('/show', passport.authenticate('jwt', { session: false}), function(req, res) {
    Subtask.find({} , function(err, subtasks) {
        if (err) throw err;
        console.log(subtasks);
        return res.json({success: true, authorized: true, user: req.user, subtasks:subtasks});
    });

});

subtaskRouter.post('/delete', passport.authenticate('jwt', { session: false}), function(req, res) {
    console.log("deleteproduct");
    Subtask.remove({ subtask_name: req.body.subtaskname }, function(err) {
        if (err) {
            return res.status(500).send({success: false, msg: 'Server Error.'});
        }
        else {
            Subtask.find({} , function(err, subtasks) {
                if (err) throw err;
                console.log(subtasks);
                return res.json({success: true, authorized: true, user: req.user, subtasks:subtasks});
            });
        }
    });


});
subtaskRouter.post('/edit', passport.authenticate('jwt', { session: false}), function(req, res) {
    console.log("editproducts");
    Subtask.update({_id: req.body.subtaskname}, {$set: { subtask_name: req.body.editname,subtask_type:req.body.edittype,subtask_option:req.body.editoption}}, {upsert: true}, function(err){
        if (err) {
            return res.status(500).send({success: false, msg: 'Server Error.'});
        }
        else {
            Subtask.find({}, function (err, subtasks) {
                if (err) throw err;
                console.log(subtasks);
                return res.json({success: true, authorized: true, user: req.user, subtasks: subtasks});
            });
        }
    });
});
getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};
module.exports = subtaskRouter;