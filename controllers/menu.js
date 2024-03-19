const Menu = require("../models/menu");

async function createMenu(req, res) {
  const menu = new Menu(req.body);
  menu
    .save()
    .then((userStored) => {
      return res.status(200).send(userStored);
    })
    .catch((err) => {
      res.status(400).send({ msg: "Error al crear el menu" });
    });
}

async function getMenus(req, res) {
  const { active } = req.query;

  let response = null;

  if (active === undefined) {
    response = await Menu.find().sort({ order: "asc" });
  } else {
    response = await Menu.findOne({ active }).sort({ order: "asc" });
  }
  if (!response) {
    return res.status(400).send({ msg: "No se encontro ningun menu" });
  } else {
    return res.status(200).send(response);
  }
}

async function updateMenu(req, res) {
  const { id } = req.params;

  const menuData = req.body;

  Menu.findByIdAndUpdate({ _id: id }, menuData)
    .then((userStored) => {
      return res.status(201).send({ msg: "Actualización de menu correcta" });
    })
    .catch((err) => {
      res.status(400).send({ msg: "Error al actualizar el menu" });
    });
}
async function deleteMenu(req, res) {
  const { id } = req.params;

  Menu.findByIdAndDelete({ _id: "65fa1df343c2146b3ed490" })
    .then((userStored) => {
      return res.status(201).send({ msg: "Eliminación de menu correcta" });
    })
    .catch((err) => {
      res.status(400).send({ msg: "Error al eliminar el menu" });
    });
}

module.exports = {
  createMenu,
  getMenus,
  updateMenu,
  deleteMenu
};
