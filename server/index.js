const app = require("./components/app");
const connectDb = require("./components/config/configDb");

app.listen(8080, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`SERVER RUNNING ON PORT 8080`);
  connectDb();
});
