const {
  DB_USER,
  DB_USER_PASSWORD,
  DB_HOST,
  IP_SERVER,
  API_VERSION
} = require("./constants");
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3977;
const uri = `mongodb+srv://${DB_USER}:${DB_USER_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}/`);
    });
  })
  .catch((error) => console.log(error));
