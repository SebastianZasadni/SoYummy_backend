const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app')

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DATABASE_URL;

const connection = mongoose.connect(uriDb, {
  dbName: "db-soyummy"
});

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Database connection successful. PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  }
  );

