const express = require("express");
const productRouter = express.Router();
const Product = require("../models/Product");
const Task = require("../models/Task");
const Subtask = require("../models/Subtask");
const passport = require("passport");
require("../settings/passport")(passport);

productRouter.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
        var product_name = req.body.productname;
        var p = new Product();
        p.product_name = product_name;
        p.save(function(err) {
            if (err) return handleError(err);
            Product.find({}, function(err, products) {
                if (err) throw err;
                console.log(products);
                return res.json({
                    success: true,
                    authorized: true,
                    user: req.user,
                    products: products
                });
            });
        });
    }
);

productRouter.get(
    "/getproduct/:name",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
       
        Product.getProduct(req.params.name, (status, err, data) => {
            if (status === 200) {
              
                return res.json({
                    success: true,
                    authorized: true,
                    product: data,
                    user: req.user,
                    product: data
                });
            } else {
                return res.json({
                    success: false,
                    authorized: true,
                    user: req.user,
                    err: err
                });
            }
        });
    }
);

productRouter.post(
    "/show",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
        Product.find({}, function(err, products) {
            if (err) throw err;
            console.log(products);
            return res.json({
                success: true,
                authorized: true,
                user: req.user,
                products: products
            });
        });
    }
);

productRouter.post(
    "/delete",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
        console.log("deleteproduc");
        Product.remove({ product_name: req.body.productname }, function(err) {
            if (err) {
                return res
                    .status(500)
                    .send({ success: false, msg: "Server Error." });
            } else {
                Product.find({}, function(err, products) {
                    if (err) throw err;
                    console.log(products);
                    return res.json({
                        success: true,
                        authorized: true,
                        user: req.user,
                        products: products
                    });
                });
            }
        });
    }
);
productRouter.post(
    "/edit",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
        console.log("editproducts");
        Product.update(
            { product_name: req.body.productname },
            { $set: { product_name: req.body.editname } },
            { upsert: true },
            function(err) {
                if (err) {
                    return res
                        .status(500)
                        .send({ success: false, msg: "Server Error." });
                } else {
                    Product.find({}, function(err, products) {
                        if (err) throw err;
                        console.log(products);
                        return res.json({
                            success: true,
                            authorized: true,
                            user: req.user,
                            products: products
                        });
                    });
                }
            }
        );
    }
);
productRouter.post("/addnewtask", function(req, res) {
    console.log(req.body.id, "addtask");
    Task.findOne({ task_name: req.body.taskname }, function(err, task) {
        if (err) {
            console.log(err);
        }
        console.log(task);
        if (!task) {
            var t = new Task();
            t.task_name = req.body.taskname;
            t.save(function(err) {
                if (err) return handleError(err);
            });
        }
    });
    Product.findByIdAndUpdate(
        req.body.id,
        {
            $push: {
                task: {
                    $each: [{ task_name: req.body.taskname }],
                    $position: req.body.position + 1
                }
            }
        },
        function(err, model) {
            if (err) {
                console.log(err, "error");
                return res
                    .status(500)
                    .send({ success: false, msg: "databswr Error." });
            } else {
                Product.find({}, function(err, products) {
                    if (err) throw err;
                    console.log(model, "products");
                    return res.json({
                        success: true,
                        authorized: true,
                        user: req.user,
                        products: products
                    });
                });
            }
        }
    );
});

productRouter.post("/addoldtask", function(req, res) {
    Product.findByIdAndUpdate(
        req.body.id,
        {
            $push: {
                task: {
                    $each: [
                        {
                            task_name: req.body.task.task_name,
                            subtask: req.body.task.subtask
                        }
                    ],
                    $position: req.body.position + 1
                }
            }
        },
        function(err, model) {
            if (err) {
                console.log(err, "error");
                return res
                    .status(500)
                    .send({ success: false, msg: "databswr Error." });
            } else {
                Product.find({}, function(err, products) {
                    if (err) throw err;
                    console.log(model, "products");
                    return res.json({
                        success: true,
                        authorized: true,
                        user: req.user,
                        products: products
                    });
                });
            }
        }
    );
});

productRouter.post("/edittask", function(req, res) {
    console.log(req.body.id, "edittask");
    Product.update(
        { _id: req.body.id, "task.task_name": req.body.task_id },
        { $set: { "task.$.task_name": req.body.editname } },
        function(err, model) {
            if (err) {
                console.log(err, "error");
                return res
                    .status(500)
                    .send({ success: false, msg: "databswr Error." });
            } else {
                Product.find({}, function(err, products) {
                    if (err) throw err;
                    console.log(products, "products");
                    return res.json({
                        success: true,
                        authorized: true,
                        user: req.user,
                        products: products
                    });
                });
            }
        }
    );
});

productRouter.post("/deletetask", function(req, res) {
    console.log(req.body.id);
    Product.findByIdAndUpdate(
        req.body.id,
        { $pull: { task: { task_name: req.body.taskname } } },
        function(err, model) {
            if (err) {
                console.log(err);
                return res
                    .status(500)
                    .send({ success: false, msg: "databswr Error." });
            } else {
                Product.find({}, function(err, products) {
                    if (err) throw err;
                    console.log(products, "products");
                    return res.json({
                        success: true,
                        authorized: true,
                        user: req.user,
                        products: products
                    });
                });
            }
        }
    );
});

productRouter.post("/addnewsubtask", function(req, res) {
    // console.log(req.body.id, "addsubtask");
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
        { task_name: req.body.taskid },
        {
            $push: {
                subtask: {
                    subtask_name: req.body.subtaskname,
                    subtask_type: req.body.subtasktype,
                    subtask_option: req.body.subtaskoption
                }
            }
        },
        { new: true },
        function(err, task) {
            if (err) {
                console.log(err, "error");
            }
            console.log(task, "updatetask");
        }
    );
    Product.update(
        { _id: req.body.id, "task._id": req.body.taskname },
        {
            $push: {
                "task.$.subtask": {
                    $each: [
                        {
                            subtask_name: req.body.subtaskname,
                            subtask_type: req.body.subtasktype,
                            subtask_option: req.body.subtaskoption
                        }
                    ],
                    $position: req.body.position + 1
                }
            }
        },
        { upsert: true },
        function(err, model) {
            if (err) {
                console.log(err, "error");
                return res
                    .status(500)
                    .send({ success: false, msg: "databswr Error." });
            } else {
                Product.find({}, function(err, products) {
                    if (err) throw err;
                    console.log(products, "products");
                    return res.json({
                        success: true,
                        authorized: true,
                        user: req.user,
                        products: products
                    });
                });
            }
        }
    );
});
productRouter.post("/addoldsubtask", function(req, res) {
    console.log(req.body.id, "addoldsubtask");
    Product.update(
        { _id: req.body.id, "task._id": req.body.taskname },
        {
            $push: {
                "task.$.subtask": {
                    $each: [
                        {
                            subtask_name: req.body.subtask.subtask_name,
                            subtask_type: req.body.subtask.subtask_type,
                            subtask_option: req.body.subtask.subtask_option
                        }
                    ],
                    $position: req.body.position + 1
                }
            }
        },
        { upsert: true },
        function(err, model) {
            if (err) {
                console.log(err, "error");
                return res
                    .status(500)
                    .send({ success: false, msg: "databswr Error." });
            } else {
                Product.find({}, function(err, products) {
                    if (err) throw err;
                    console.log(products, "products");
                    return res.json({
                        success: true,
                        authorized: true,
                        user: req.user,
                        products: products
                    });
                });
            }
        }
    );
});
productRouter.post("/deletesubtask", function(req, res) {
    console.log(req.body.id, "deletesubtask");
    Product.update(
        { _id: req.body.id, "task._id": req.body.taskname },
        { $pull: { "task.$.subtask": { subtask_name: req.body.subtaskname } } },
        function(err, model) {
            if (err) {
                console.log(err, "error");
                return res
                    .status(500)
                    .send({ success: false, msg: "databswr Error." });
            } else {
                Product.find({}, function(err, products) {
                    if (err) throw err;
                    console.log(products, "products");
                    return res.json({
                        success: true,
                        authorized: true,
                        user: req.user,
                        products: products
                    });
                });
            }
        }
    );
});
productRouter.post("/editsubtask", function(req, res) {
    console.log(
        req.body.id,
        req.body.taskname,
        req.body.subtaskname,
        "editsubtask"
    );
    Product.findById(req.body.id).then(products => {
        console.log(products);
        for (let i = 0; i < products.task.length; i++) {
            console.log(products.task[i]._id.toString() === req.body.taskname);
            if (products.task[i]._id.toString() === req.body.taskname) {
                let subtasks = products.task[i].subtask;
                console.log(subtasks);
                for (let j = 0; j < subtasks.length; j++) {
                    if (subtasks[j]._id.toString() === req.body.subtaskname) {
                        console.log("i", i);
                        console.log("j", j);
                        let data = {};
                        data["task." + i + ".subtask." + j + ".subtask_name"] =
                            req.body.editname;
                        data["task." + i + ".subtask." + j + ".subtask_type"] =
                            req.body.edittype;
                        data[
                            "task." + i + ".subtask." + j + ".subtask_option"
                        ] = req.body.editoption;
                        //data["operations." + i + ".parameters." + j + ".description"] = updatedescription
                        //data["operations." + i + ".parameters." + j + ".value"] = updatevalue
                        console.log(data);
                        Product.update(
                            {
                                _id: req.body.id
                            },
                            {
                                $set: data
                            }
                        )
                            .then(function(resp) {
                                Product.find({}, function(err, products) {
                                    if (err) throw err;
                                    console.log(products, "products");
                                    console.log(resp, "resp");
                                    return res.json({
                                        success: true,
                                        authorized: true,
                                        user: req.user,
                                        products: products
                                    });
                                });
                            })
                            .catch(function(err) {
                                console.log(err, "error");
                                return res.status(500).send({
                                    success: false,
                                    msg: "databswr Error."
                                });
                            });
                    }
                }
            }
        }
    });
});
getToken = function(headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(" ");
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};
module.exports = productRouter;
