const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log(`MONGODB CONNECTED SUCCESSFULLY`);
    })
    .catch(() => {
      console.log(`MONGODB CONNECTED FALIED`);
      process.exit(1);
    });
};
