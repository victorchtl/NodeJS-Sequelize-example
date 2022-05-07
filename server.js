const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.use(
  cookieSession({
    name: "mood-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to mood application." });
  console.log(process.env.ACCESS_TOKEN_SECRET)
});

const db = require("./models");
const Role = db.role;
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });
db.sequelize.sync();
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}
require('./routes/auth.routes')(app);
require("./routes/user.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
