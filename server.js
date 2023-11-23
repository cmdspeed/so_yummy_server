const app = require("./app");

const mongoose = require("mongoose");

const connection = mongoose.connect(process.env.URIDB);

connection
  .then(() => {
    app.listen(3001, "0.0.0.0", function () {
      console.log(`Database connection successful`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });

app.listen(3001, () => {
  console.log("Server running. Use our API on port: 3001");
});
