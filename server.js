require('dotenv').config()
const mysql = require("mysql");
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const PORT = 5000;
const initializePassport = require('./passport-config')

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id_users => users.find(user => user.id_users === id_users)
)

// SQL Connection

const db = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'test2',
	password: '123',
	database: "reflow"
});

const users = [];

let query = "SELECT * FROM users";

db.query(query, function (err, result, fields) {
	if (err) {
		throw err;
		console.log("Error Inserting User");
	} else {
		console.log("\nGot Users\n");
		for(let i = 0; i < result.length; i++) {
			result[i] = JSON.parse(JSON.stringify(result[i]));
			users.push(result[i]);
		}
		console.log(users)
	}
});

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// Main Pages
app.get('/', checkNotAuthenticated, (req, res) => {
	res.render('index.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.get('/projects', checkNotAuthenticated, (req, res) => {
	res.render('projects.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.get('/showcase', checkNotAuthenticated, (req, res) => {
	res.render('showcase.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.get('/contact', checkNotAuthenticated, (req, res) => {
	res.render('contact.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.get('/booking', checkNotAuthenticated, (req, res) => {
	res.render('booking.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

// Signup Login
app.get('/login', checkNotAuthenticated, (req, res) => {
	res.render('login.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
	res.render('register.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
	
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id_users: Date.now(),
      username: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
	
	let query = "INSERT INTO users VALUES (null,'" + req.body.name + "','" + req.body.email + "','" + hashedPassword + "')";
	
	db.query(query, function (err, result, fields) {
		if (err)  {
			throw err;
		} else {
			console.log("User Inserted Correctly")
		}
	});
	
	console.log(users)
	
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

app.get('/dashboard', checkAuthenticated, (req, res) => {
  res.render('dashboard.ejs')
})

// Auth Functions
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
	  
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard')
  }
  next()
}

console.log("Server Started on port " + PORT);

app.listen(PORT);