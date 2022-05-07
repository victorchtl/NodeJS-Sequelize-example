const { authJwt } = require("../middleware");
module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", users.create);
    // Retrieve all Tutorials
    router.get("/", users.findAll);
    // Retrieve all published Tutorials
    router.get("/published", users.findAllPublished);
    // Retrieve a single Tutorial with id
    router.get("/:id", users.findOne);
    // Update a Tutorial with id
    router.put("/:id", users.update);
    // Delete a Tutorial with id
    router.delete("/:id", users.delete);
    // Delete all Tutorials
    router.delete("/", users.deleteAll);

    router.get("/all", users.allAccess);
    router.get("/user",[authJwt.verifyToken],users.userBoard);
    router.get("/mod",[authJwt.verifyToken, authJwt.isModerator],users.moderatorBoard);
    router.get("/admin",[authJwt.verifyToken, authJwt.isAdmin],users.adminBoard);

    app.use('/api/users', router);
  };
