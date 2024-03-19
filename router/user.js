const express = require("express");
const UserController = require("../controllers/user");
const asureAuth = require("../middlewares/autenticated");
const multiparty = require("connect-multiparty");

const mdUpload = multiparty({ uploadDir: "./uploads/avatar" });
const api = express.Router();

api.get("/user/me", [asureAuth], UserController.getMe);
api.get("/users", [asureAuth], UserController.getUsers);
api.post("/user", [asureAuth, mdUpload], UserController.createUser);
api.patch("/user/:id", [asureAuth, mdUpload], UserController.updateUser);
api.delete("/user/:id", [asureAuth], UserController.deleteUser);

module.exports = api;
