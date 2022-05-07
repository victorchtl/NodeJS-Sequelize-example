const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
        res.status(400).send({
            message: "user must have a username!"
        });
        return;
    }
    if (!req.body.email) {
        res.status(400).send({
            message: "user must have an email!"
        });
        return;
    }
    if (!req.body.password) {
        res.status(400).send({
            message: "password can not be empty!"
        });
        return;
    }
    // Create a User
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    // Save User in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
        });
};
// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    Mood.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving moods."
            });
        });
};
// Find a single User with an id
exports.findOne = (req, res) => {
    User.findOne({ where: { id: req.params.id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving moods."
            });
        });
};
// Update a User by the id in the request
exports.update = (req, res) => {

};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {

};
// Delete all Users from the database.
exports.deleteAll = (req, res) => {

};
// Find all published Users
exports.findAllPublished = (req, res) => {

};

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};