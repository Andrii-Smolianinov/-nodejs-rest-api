const app = require("./app");

const mongoose = require("mongoose");

mongoose.set("strictQuery", true)

const { DB_HOST, PORT = 3000 } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log('\x1b[46m', `==> Database connection successful. Port: ${PORT} <==`, '\x1b[0m');
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
