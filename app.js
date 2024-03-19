const express = require("express");
const cors = require("cors");
const { API_VERSION } = require("./constants");

const app = express();

//Imports routings
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const menuRoutes = require("./router/menu");

// Middleware para analizar cuerpos JSON
app.use(express.json());

// Middleware para analizar cuerpos URL-encoded
app.use(express.urlencoded({ extended: true }));

//Configure static folder
app.use(express.static("uploads"));

//Configure Heades HTTP - Cors
app.use(cors());

//Configure routings
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);

module.exports = app;
