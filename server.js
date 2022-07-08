require('dotenv').config()
const mysql = require("mysql")
const express = require('express')
const path = require('path')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const favicon = require('serve-favicon')
const busboy = require('connect-busboy')
const fs = require('fs-extra')
const PORT = 5000;
const initializePassport = require('./passport-config')

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id_user => users.find(user => user.id_user === id_user)
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
		console.log("\nGot Users");
		for(let i = 0; i < result.length; i++) {
			result[i] = JSON.parse(JSON.stringify(result[i]));
			users.push(result[i]);
		}
		console.log(users)
	}
});

app.set('view-engine', 'ejs')
app.use(busboy());
app.use(express.static(path.join(__dirname)));
app.use(favicon(__dirname + '/files/icons/favicon.ico'));
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
app.get('/', function (req, res) {
	res.render('index.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.get('/projects', function (req, res) {
	res.render('projects.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.get('/showcase', function (req, res) {
	res.render('showcase.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.get('/contact', function (req, res) {
	res.render('contact.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.get('/booking', function (req, res) {
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

	// Password Validation
	var passwordExpression  = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
	var emailExpression = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

	if(!passwordExpression.test(req.body.password)) {
		console.log("Password: From 6 to 16 with Numbers");
		return false;
	} else if (!emailExpression.test(req.body.email)) {
		console.log("Email: test@test.com");
		return false;
	} else {
		try {
			const hashedPassword = await bcrypt.hash(req.body.password, 10)
			let temp = Date.now().toString();

			users.push({
				id_user: Date.now(),
				username: req.body.name,
				email: req.body.email,
				password: hashedPassword,
				timestamp: temp
			})

			let query = "INSERT INTO users (username, email, password, timestamp) VALUES ('" + req.body.name + "','" + req.body.email + "','" + hashedPassword + "','" + temp + "')";

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
	}
})

app.delete('/logout', (req, res) => {
	req.logout(req.user, err => {
		if(err) return next(err);
		res.redirect("/login");
	});
});

// Get User Requests Function

let getRequests = async (user_id) => {
	
    const query = "SELECT * FROM requests WHERE id_user = " + user_id;
	let requests = [];
	let result = await new Promise((resolve, reject) => db.query(query, (err, result) => {
		if (err) {
			reject(err)
		} else {
			resolve(result);
			console.log("\nGot Requests")
			for(let i = 0; i < result.length; i++) {
				result[i] = JSON.parse(JSON.stringify(result[i]));
				requests.push(result[i]);
			}
		}
	}));
	console.log(requests)
	return requests;
}

app.get('/dashboard', checkAuthenticated, async (req, res) => {
	let user_id = req.user[Object.keys(req.user)[0]];
	let requests = await getRequests(user_id);

	console.log("\nLogged as Username: " + req.user[Object.keys(req.user)[1]] + " | Email: " + req.user[Object.keys(req.user)[2]] + " | Id: " + req.user[Object.keys(req.user)[0]]);
	res.render('dashboard.ejs', { data: req.user, requests: requests }),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.get('/editor', checkAuthenticated, (req, res) => {
	res.render('editor.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.post('/editor', checkAuthenticated, (req, res) => {
	let user_id = req.user[Object.keys(req.user)[0]];
	console.log("Redirecting to editor ejs with request " + req.body.request_id + " from " + user_id)
	res.render('editor.ejs', { data: user_id, request: req.body.request_id }),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

// Auth Functions
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard')
  }
  next()
}

// Get Avatar Image
app.route('/saveavatar').post(function (req, res, next) {
	var fstream;
	req.pipe(req.busboy);
	req.busboy.on('file', function (fieldname, file, filename) {
		console.log("Uploading: " + JSON.stringify(filename));
		filename = req.user[Object.keys(req.user)[0]] + ".jpg"
		fstream = fs.createWriteStream(__dirname + '/files/user/' + filename);
		file.pipe(fstream);
		fstream.on('close', function () {    
			console.log("Upload Finished of " + JSON.stringify(filename));              
			res.redirect('/dashboard');
		});
	});
});

// Port
console.log("Server Started on port " + PORT);
app.listen(PORT);