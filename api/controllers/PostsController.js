/**
 * PostsController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getallposts: function (req, res) {
        Posts.find({}).exec(function (err, found) {
            if (err) {
                res.json(err);
            } else {
                res.json(found);
            }
        });
    },
    createposts: function (req, res) {
        var obj = req.body;
        console.log("try");
        console.log(obj);
        Posts.create(obj).exec(function (err, found) {
            if (err) {
                console.log(err);
                res.json(err);
            } else {
                sails.sockets.blast("create",found);
                res.json(found);
            }
        });
    },
    editposts: function (req, res) {
        var obj = req.body;
        var cri = {
            id: obj.id
        };
        Posts.update(cri, obj).exec(function (err, found) {
            if (err) {
                res.json(err);
            } else {
                sails.sockets.blast("edit",obj);
                res.json(found);
            }
        });
    },
    deleteposts: function (req, res) {
        var obj = req.body;
        Posts.destroy(obj).exec(function (err, found) {
            if (err) {
                res.json(err);
            } else {
                sails.sockets.blast("delete",obj);
                res.json(found);
            }
        });
    },
};