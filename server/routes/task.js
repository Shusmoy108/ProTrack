const express = require('express');
const taskRouter = express.Router();
const Task = require('../models/Task');
const passport = require('passport');
const Subtask = require('../models/Subtask');
require('../settings/passport')(passport);


taskRouter.post('/create', passport.authenticate('jwt', { session: false}), function(req, res) {
    var task_name=req.body.taskname;
    console.log(task_name);
    var t= new Task();
    t.task_name=task_name;
    t.save(function (err) {
        if (err) return handleError(err);
        Task.find({} , function(err, tasks) {
            if (err) throw err;
            console.log(tasks);
            return res.json({success: true, authorized: true, user: req.user, tasks:tasks});
        });

    });


});
taskRouter.get('/show', passport.authenticate('jwt', { session: false}), function(req, res) {
    Task.find({} , function(err, tasks) {
        if (err) throw err;
        console.log(tasks);
        return res.json({success: true, authorized: true, user: req.user, tasks:tasks});
    });

});

taskRouter.post('/delete', passport.authenticate('jwt', { session: false}), function(req, res) {
    console.log("deleteproduct");
    Task.remove({ task_name: req.body.taskname }, function(err) {
        if (err) {
            return res.status(500).send({success: false, msg: 'Server Error.'});
        }
        else {
            Task.find({} , function(err, tasks) {
                if (err) throw err;
                console.log(tasks);
                return res.json({success: true, authorized: true, user: req.user, tasks:tasks});
            });
        }
    });


});
taskRouter.post('/edit', passport.authenticate('jwt', { session: false}), function(req, res) {
    console.log("editproducts");
    Task.update({task_name: req.body.taskname}, {$set: { task_name: req.body.editname}}, {upsert: true}, function(err){
        if (err) {
            return res.status(500).send({success: false, msg: 'Server Error.'});
        }
        else {
            Task.find({}, function (err, tasks) {
                if (err) throw err;
                console.log(tasks);
                return res.json({success: true, authorized: true, user: req.user, tasks: tasks});
            });
        }
    });
});


taskRouter.post('/addnewsubtask', passport.authenticate('jwt', { session: false}), function(req, res) {
    console.log(req.body.id, "addsubtask");
    Subtask.findOne({ subtask_name: req.body.subtaskname }, function(
      err,
      subtask
    ) {
      if (err) {
        console.log(err);
      }
      //console.log(subtask);
      if (!subtask) {
        var s = new Subtask();
        s.subtask_name = req.body.subtaskname;
        s.subtask_type = req.body.subtasktype;
        s.subtask_option = req.body.subtaskoption;
        s.save(function(err) {
          if (err) return handleError(err);
        });
      }
    });
    Task.findOneAndUpdate(
      { task_name: req.body.taskname },
      {
        $push: {
          subtask: {
              $each:[{
            subtask_name: req.body.subtaskname,
            subtask_type: req.body.subtasktype,
            subtask_option: req.body.subtaskoption
              }],
              $position: req.body.position + 1
          }
        }
      },
      { new: true },
      function(err, task) {
        if (err) {
          console.log(err, "error");
        }
        else{
            Task.find({}, function (err, tasks) {
                if (err) throw err;
                console.log(tasks);
                return res.json({success: true, authorized: true, user: req.user, tasks: tasks});
            });
        }
      }
    );
});
taskRouter.post('/addoldsubtask', passport.authenticate('jwt', { session: false}), function(req, res) {
    console.log(req.body.id, "addsubtask");
    Task.findOneAndUpdate(
      { task_name: req.body.taskname },
      {
        $push: {
          subtask: {
              $each:[{
            subtask_name: req.body.subtask.subtask_name,
            subtask_type: req.body.subtask.subtask_type,
            subtask_option: req.body.subtask.subtask_option
              }],
              $position: req.body.position + 1
          }
        }
      },
      { new: true },
      function(err, task) {
        if (err) {
          console.log(err, "error");
        }
        else{
            Task.find({}, function (err, tasks) {
                if (err) throw err;
                console.log(tasks);
                return res.json({success: true, authorized: true, user: req.user, tasks: tasks});
            });
        }
      }
    );
});
taskRouter.post("/editsubtask", function(req, res) {
    console.log(req.body.subtaskname, "edittask");
    Task.findOneAndUpdate(
      { task_name: req.body.taskname, 'subtask._id':req.body.subtaskname },
      { $set: { "subtask.$.subtask_name": req.body.editname,"subtask.$.subtask_type":req.body.edittype,"subtask.$.subtask_option":req.body.editoption } },
      function(err, model) {
        if (err) {
          console.log(err, "error");
          return res.status(500).send({ success: false, msg: "databswr Error." });
        } else {
            Task.find({}, function (err, tasks) {
                if (err) throw err;
                console.log(tasks);
                return res.json({success: true, authorized: true, user: req.user, tasks: tasks});
            });
        }
      }
    );
  });
  
  taskRouter.post("/deletesubtask", function(req, res) {
    //console.log(req.body.id);
    Task.findOneAndUpdate(
      { task_name: req.body.taskname},
      { $pull: { subtask: { subtask_name: req.body.subtaskname } } },
      function(err, model) {
        if (err) {
          console.log(err);
          return res.status(500).send({ success: false, msg: "databswr Error." });
        } else {
            Task.find({}, function (err, tasks) {
                if (err) throw err;
                console.log(tasks);
                return res.json({success: true, authorized: true, user: req.user, tasks: tasks});
            });
        }
      }
    );
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
module.exports = taskRouter;