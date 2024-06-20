const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const handlebars = require("express-handlebars");
const session = require('express-session');
const mongoose = require('mongoose');
const fs = require('fs');
const db = require("./models");
const Role = db.role;
const path = require('path');
const app = express();
const cookieSession = require("cookie-session");
const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT;

app.set("view engine", "hbs");
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
    defaultLayout: "index",
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.set('strictQuery', true);
console.log(typeof mongoURI)
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to Mongo Database");
    initial();
  })
  .catch((error) => {
    console.error(`Connection refused: ${error}`);
  });
const cors = require("cors");

const { log } = require("console");

const corsOptions = {
  origin: 'http://localhost:3001', // Cambia esto a tu dominio permitido
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cookieSession({
    name: "Encuestas.web",
    keys: ["COOKIE_SECRET"],
    httpOnly: true
  })
);

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

app.get('/', (req, res) => {
  res.render('layouts/index');
});

initial();

module.exports = app;