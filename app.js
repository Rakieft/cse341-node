const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const mysql = require("mysql");

app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var sess;

router.get('/', (req, res) => {
  sess = req.session;
  if (sess.email) {
    return res.redirect('/admin');
  }
  res.send('Ok');
});

router.post('/login', (req, res) => {
  sess = req.session;
  sess.email = req.body.email;
  res.end('done');
});

router.get('/admin', (req, res) => {
  sess = req.session;
  if (sess.email) {
    res.write(`Hello ${sess.email}`);
    res.end('Logout');
  } else {
    res.write('Please login first.');
    res.end('Login');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect('/');
  });
});

app.use('/', router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App Started on PORT ${process.env.PORT || 3000}`);
});

// const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "NedArthur23",
  database: "cse341",
  debug: false,
});

pool.query("SELECT * FROM users LIMIT 10", (err, rows) => {

  if (err) {
    console.log("Database error:", err);
    return;
  }

  if (rows && rows.length > 0) {
    console.log(rows[0]);
  } else {
    console.log("No data found");
  }

});