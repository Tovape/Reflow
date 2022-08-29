require('dotenv').config()
const mysql = require("mysql")
const express = require('express')
const router = express.Router()
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const CryptoJS = require("crypto-js")
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const favicon = require('serve-favicon')
const busboy = require('connect-busboy')
const fs = require('fs-extra')
const PORT = 5000;
const initializePassport = require('./passport-config')
const ikeachecker = require('ikea-availability-checker')

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  user_id => users.find(user => user.user_id === user_id)
)

// USE

app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({limit: '20mb', extended: true}));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}));
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

// SQL Connection

const db = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'test2',
	password: '123',
	database: "reflow"
});

// Get Users

const users = [];

let query = "SELECT * FROM users";

db.query(query, function (err, result, fields) {
	if (err) {
		throw err;
		console.log("Error Getting Users");
	} else {
		console.log("\nGot Users");
		for(let i = 0; i < result.length; i++) {
			result[i] = JSON.parse(JSON.stringify(result[i]));
			users.push(result[i]);
		}
		console.log(users)
	}
});

// Get User Requests Function

let getRequests = async (user_id) => {
	
    const query = "SELECT * FROM requests WHERE user_id = " + user_id;
	let requests = [];
	let result = await new Promise((resolve, reject) => db.query(query, (err, result) => {
		if (err) {
			reject(err)
		} else {
			resolve(result);
			console.log("\nGot Requests JSON")
			for(let i = 0; i < result.length; i++) {
				result[i] = JSON.parse(JSON.stringify(result[i]));
				requests.push(result[i]);
			}
		}
	}));
	console.log(requests)
	return requests;
}

// Get JSON Requests Function

let getJson = async (request_id) => {
	
	let query = "SELECT json FROM requests WHERE request_id = " + request_id;
	
	let result = await new Promise((resolve, reject) => db.query(query, (err, result) => {
		if (err) {
			reject(err)
		} else {
			resolve(result);
			console.log("\nGot Request JSON")
			console.log(result)
		}
	}));
	return result;
}

// Get JSON Objects List

let getObjects = async () => {
	
	let query = "SELECT * FROM objects";
	let objects = [];
	
	let result = await new Promise((resolve, reject) => db.query(query, (err, result) => {
		if (err) {
			reject(err)
		} else {
			resolve(result);
			console.log("\nGot Objects JSON")
			for(let i = 0; i < result.length; i++) {
				result[i] = JSON.parse(JSON.stringify(result[i]));
				objects.push(result[i]);
			}
		}
	}));
	return objects;
}

// Auth Function

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

// GET

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

app.get('/failure', function (req, res) {
	res.render('failure.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.get('/success', function (req, res) {
	res.render('success.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.get('/login', checkNotAuthenticated, (req, res) => {
	res.render('login.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.get('/register', checkNotAuthenticated, (req, res) => {
	res.render('register.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.get('/new', checkAuthenticated, (req, res) => {
	res.render('new.ejs', { user_data: req.user }),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.get('/dashboard', checkAuthenticated, async (req, res) => {
	let user_id = req.user[Object.keys(req.user)[0]];
	let requests = await getRequests(user_id);

	console.log("\nLogged as Username: " + req.user[Object.keys(req.user)[1]] + " | Email: " + req.user[Object.keys(req.user)[2]] + " | Id: " + req.user[Object.keys(req.user)[0]]);
	res.render('dashboard.ejs', { user_data: req.user, requests: requests }),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.get('/editor', checkAuthenticated, async (req, res) => {
	res.render('editor.ejs', { user_data: req.user, objects: objects }),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.get('/resetpassword', checkNotAuthenticated, (req, res) => {
	res.render('resetpassword.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.get('/newpassword', function (req, res) {
	res.render('newpassword.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

// POST

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}))

app.post('/register', checkNotAuthenticated, async (req, res) => {

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
				user_id: Date.now(),
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

app.post('/editor', checkAuthenticated, async (req, res) => {
	let user_id = req.user[Object.keys(req.user)[0]];
	console.log("Redirecting to editor ejs with request " + req.body.request_id + " with title " + req.body.request_title + " with description " + req.body.request_description + " from " + user_id)
	
	if (req.body.request_title === undefined || req.body.request_title === null) {
		console.log("Creating New Request");
		let query = "INSERT INTO requests VALUES (" + req.body.request_id + ", " + req.user[Object.keys(req.user)[0]] + ", 'Title', 'Description', 'photos', '" + new Date().getFullYear() + "', '0','')";
		db.query(query, function (err, result, fields) {
			if (err)  {
				throw err;
			} else {
				console.log("Request Added Correctly")
			}
		});
		let objects = await getObjects();
		setTimeout(function () {
			let stringfiedobjects = JSON.stringify(objects);
			let objectslength = Object.keys(objects).length;

			res.render('editor.ejs', { user_data: req.user, request_id: req.body.request_id, jsonsave: '', objects: objects, objectslength: objectslength, request_title: 'Title', request_description: 'Description' }),
			app.use(express.static(__dirname + '/css')),
			app.use(express.static(__dirname + '/files')),
			app.use(express.static(__dirname + '/js'))
		}, 1000);
	} else {
		let jsonsave = await getJson(req.body.request_id);
		let objects = await getObjects();

		setTimeout(function () {
			let stringfiedjsonsave = JSON.stringify(jsonsave);

			let stringfiedobjects = JSON.stringify(objects);
			let objectslength = Object.keys(objects).length;

			res.render('editor.ejs', { user_data: req.user, request_id: req.body.request_id, jsonsave: stringfiedjsonsave, objects: objects, objectslength: objectslength, request_title: req.body.request_title, request_description: req.body.request_description }),
			app.use(express.static(__dirname + '/css')),
			app.use(express.static(__dirname + '/files')),
			app.use(express.static(__dirname + '/js'))
		}, 1000);
	}
})

/* FIX
app.post('/savecanvas', (req, res) => {
	console.log("\nSaving Canvas Server-Side")
	
	var json = JSON.stringify(req.body[Object.keys(req.body)[0]]);
	var request_id = req.body[Object.keys(req.body)[1]];
	var flat_id = req.body[Object.keys(req.body)[2]];
	
	flat_id++;

	console.log("\nRequest " + request_id);
	console.log("Flat " + flat_id);
	if (json != null || json != 'undefined' || json != '') {
		let query = "UPDATE flats SET json = '" + json + "' WHERE flat_id = " + flat_id + " AND request_id = " + request_id;
		db.query(query, function (err, result, fields) {
			if (err)  {
				throw err;
			} else {
				console.log("Canvas Updated Correctly")
			}
		});
	}
});
*/

app.post('/saverequest', (req, res) => {
	console.log("\nSaving Request Server-Side")
	if (req.body[Object.keys(req.body)[0]] !== null && req.body[Object.keys(req.body)[0]] !== undefined && req.body[Object.keys(req.body)[0]] !== '' && req.body[Object.keys(req.body)[1]] !== null && req.body[Object.keys(req.body)[1]] !== undefined && req.body[Object.keys(req.body)[1]] !== '' && req.body[Object.keys(req.body)[2]] !== null && req.body[Object.keys(req.body)[2]] !== undefined && req.body[Object.keys(req.body)[2]] !== '') {
		console.log("\nUpdating request_id: " + req.body[Object.keys(req.body)[0]] + " new title: " + req.body[Object.keys(req.body)[1]] + " new description: " + req.body[Object.keys(req.body)[2]])
		let query = "UPDATE requests SET title = '" + req.body[Object.keys(req.body)[1]] + "', description = '" + req.body[Object.keys(req.body)[2]] + "' WHERE request_id = " + req.body[Object.keys(req.body)[0]];
		db.query(query, function (err, result, fields) {
			if (err)  {
				throw err;
			} else {
				console.log("Request Updated Correctly")
			}
		});
	} else {
		console.log("Critical Error");
	}
});

// DELETE

app.delete('/logout', (req, res) => {
	req.logout(req.user, err => {
		if(err) return next(err);
		res.redirect("/login");
	});
});

// ROUTE

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

app.route('/contactform').post(function (req, res, next) {

	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
		user: 'reflowcompany@gmail.com',
		pass: 'jfqnfpdmiddfntfk'
	  }
	});

	// For Client
	var mailOptions = {
		from: 'reflowcompany@gmail.com',
		to: req.body.email,
		subject: 'Reflow | User Contact',
		html: '<!doctype html> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <title> </title>  <meta http-equiv="X-UA-Compatible" content="IE=edge">  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> #outlook a { padding: 0; } body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, td { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; } img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; } p { display: block; margin: 13px 0; } </style>    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"> <style type="text/css"> @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700); </style>  <style type="text/css"> @media only screen and (min-width:480px) { .mj-column-per-100 { width: 100% !important; max-width: 100%; } .mj-column-per-33-333333333333336 { width: 33.333333333333336% !important; max-width: 33.333333333333336%; } } </style> <style media="screen and (min-width:480px)"> .moz-text-html .mj-column-per-100 { width: 100% !important; max-width: 100%; } .moz-text-html .mj-column-per-33-333333333333336 { width: 33.333333333333336% !important; max-width: 33.333333333333336%; } </style> <style type="text/css"> @media only screen and (max-width:480px) { table.mj-full-width-mobile { width: 100% !important; } td.mj-full-width-mobile { width: auto !important; } } </style> <style type="text/css"> </style> </head> <body style="word-spacing:normal;"> <div style="">  <div style="margin:0px auto;max-width:600px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> <tbody> <tr> <td style="border:1px solid #000000;direction:ltr;font-size:0px;padding:20px 0;text-align:center;">  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:100px;"> <img height="auto" src="/files/log/logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="100" /> </td> </tr> </tbody> </table> </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #6497b1;font-size:1px;margin:0px auto;width:100%;"> </p>  </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Arial;font-size:20px;line-height:1;text-align:center;color:#000000;">Contacto - Contact</div> </td> </tr> <tr> <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">Hola ' + req.body.name + '!<br></br><br></br>Hemos recibido una petición para contactar con nosotros, nos pondremos en contacto contigo lo más rápido possible, por correo y móvil<br></br><br></br>Gracias por confiar en nosotros :D<br></br><br></br>- Equipo Reflow</div> </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #6497b1;font-size:1px;margin:0px auto;width:100%;"> </p>  </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000;">Reflow Copyright 2022</div> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  <div style="background:#fbfbfb;background-color:#fbfbfb;margin:0px auto;max-width:600px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fbfbfb;background-color:#fbfbfb;width:100%;"> <tbody> <tr> <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="https://191n.mj.am/img/191n/3s/x0l.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="https://191n.mj.am/img/191n/3s/x01.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="https://191n.mj.am/img/191n/3s/x0s.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  </div> </body> </html>'
	};
	
	// For Us
	var mailOptionsCompany = {
		from: 'reflowcompany@gmail.com',
		to: 'reflowcompany@gmail.com',
		subject: 'Reflow | User Contact',
		html: '<!doctype html> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <title> </title>  <meta http-equiv="X-UA-Compatible" content="IE=edge">  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> #outlook a { padding: 0; } body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, td { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; } img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; } p { display: block; margin: 13px 0; } </style>    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"> <style type="text/css"> @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700); </style>  <style type="text/css"> @media only screen and (min-width:480px) { .mj-column-per-100 { width: 100% !important; max-width: 100%; } .mj-column-per-33-333333333333336 { width: 33.333333333333336% !important; max-width: 33.333333333333336%; } } </style> <style media="screen and (min-width:480px)"> .moz-text-html .mj-column-per-100 { width: 100% !important; max-width: 100%; } .moz-text-html .mj-column-per-33-333333333333336 { width: 33.333333333333336% !important; max-width: 33.333333333333336%; } </style> <style type="text/css"> @media only screen and (max-width:480px) { table.mj-full-width-mobile { width: 100% !important; } td.mj-full-width-mobile { width: auto !important; } } </style> <style type="text/css"> </style> </head> <body style="word-spacing:normal;"> <div style="">  <div style="margin:0px auto;max-width:600px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> <tbody> <tr> <td style="border:1px solid #000000;direction:ltr;font-size:0px;padding:20px 0;text-align:center;">  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:100px;"> <img height="auto" src="/files/log/logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="100" /> </td> </tr> </tbody> </table> </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #6497b1;font-size:1px;margin:0px auto;width:100%;"> </p>  </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Arial;font-size:20px;line-height:1;text-align:center;color:#000000;">Contacto - Contact</div> </td> </tr> <tr> <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">For Admin<br></br><br></br>Nueva entrada para contacto de ' + req.body.name + ' con correo ' + req.body.email + ', su mensaje:<br></br><br></br>' + req.body.message + '</div> </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #6497b1;font-size:1px;margin:0px auto;width:100%;"> </p>  </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000;">Reflow Copyright 2022</div> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  <div style="background:#fbfbfb;background-color:#fbfbfb;margin:0px auto;max-width:600px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fbfbfb;background-color:#fbfbfb;width:100%;"> <tbody> <tr> <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="https://191n.mj.am/img/191n/3s/x0l.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="https://191n.mj.am/img/191n/3s/x01.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="https://191n.mj.am/img/191n/3s/x0s.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  </div> </body> </html>'
	};

	transporter.sendMail(mailOptionsCompany, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
	  }
	});

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
		res.redirect('/failure');
	  } else {
		console.log('Email sent: ' + info.response);
		res.redirect('/success');
	  }
	});
});

app.route('/bookingform').post(function (req, res, next) {

	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
		user: 'reflowcompany@gmail.com',
		pass: 'jfqnfpdmiddfntfk'
	  }
	});

	// For Client
	var mailOptions = {
		from: 'reflowcompany@gmail.com',
		to: req.body.email,
		subject: 'Reflow | User Booking',
		html: '<!doctype html> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <title> </title>  <meta http-equiv="X-UA-Compatible" content="IE=edge">  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> #outlook a { padding: 0; } body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, td { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; } img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; } p { display: block; margin: 13px 0; } </style>    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"> <style type="text/css"> @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700); </style>  <style type="text/css"> @media only screen and (min-width:480px) { .mj-column-per-100 { width: 100% !important; max-width: 100%; } .mj-column-per-33-333333333333336 { width: 33.333333333333336% !important; max-width: 33.333333333333336%; } } </style> <style media="screen and (min-width:480px)"> .moz-text-html .mj-column-per-100 { width: 100% !important; max-width: 100%; } .moz-text-html .mj-column-per-33-333333333333336 { width: 33.333333333333336% !important; max-width: 33.333333333333336%; } </style> <style type="text/css"> @media only screen and (max-width:480px) { table.mj-full-width-mobile { width: 100% !important; } td.mj-full-width-mobile { width: auto !important; } } </style> <style type="text/css"> </style> </head> <body style="word-spacing:normal;"> <div style="">  <div style="margin:0px auto;max-width:600px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> <tbody> <tr> <td style="border:1px solid #000000;direction:ltr;font-size:0px;padding:20px 0;text-align:center;">  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:100px;"> <img height="auto" src="/files/log/logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="100" /> </td> </tr> </tbody> </table> </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #6497b1;font-size:1px;margin:0px auto;width:100%;"> </p>  </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Arial;font-size:20px;line-height:1;text-align:center;color:#000000;">Reserva - Booking</div> </td> </tr> <tr> <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">Hola ' + req.body.name + '!<br></br><br></br>Hemos recibido una petición para reservar nuestro servicio, nos pondremos en contacto contigo lo más rápido possible, por correo y móvil<br></br><br></br>Gracias por confiar en nosotros :D<br></br><br></br>- Equipo Reflow</div> </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #6497b1;font-size:1px;margin:0px auto;width:100%;"> </p>  </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000;">Reflow Copyright 2022</div> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  <div style="background:#fbfbfb;background-color:#fbfbfb;margin:0px auto;max-width:600px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fbfbfb;background-color:#fbfbfb;width:100%;"> <tbody> <tr> <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="https://191n.mj.am/img/191n/3s/x0l.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="https://191n.mj.am/img/191n/3s/x01.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="https://191n.mj.am/img/191n/3s/x0s.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  </div> </body> </html>'
	};
	
	// For Us
	var mailOptionsCompany = {
		from: 'reflowcompany@gmail.com',
		to: 'reflowcompany@gmail.com',
		subject: 'Reflow | User Booking',
		html: '<!doctype html> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <title> </title>  <meta http-equiv="X-UA-Compatible" content="IE=edge">  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> #outlook a { padding: 0; } body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, td { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; } img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; } p { display: block; margin: 13px 0; } </style>    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"> <style type="text/css"> @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700); </style>  <style type="text/css"> @media only screen and (min-width:480px) { .mj-column-per-100 { width: 100% !important; max-width: 100%; } .mj-column-per-33-333333333333336 { width: 33.333333333333336% !important; max-width: 33.333333333333336%; } } </style> <style media="screen and (min-width:480px)"> .moz-text-html .mj-column-per-100 { width: 100% !important; max-width: 100%; } .moz-text-html .mj-column-per-33-333333333333336 { width: 33.333333333333336% !important; max-width: 33.333333333333336%; } </style> <style type="text/css"> @media only screen and (max-width:480px) { table.mj-full-width-mobile { width: 100% !important; } td.mj-full-width-mobile { width: auto !important; } } </style> <style type="text/css"> </style> </head> <body style="word-spacing:normal;"> <div style="">  <div style="margin:0px auto;max-width:600px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> <tbody> <tr> <td style="border:1px solid #000000;direction:ltr;font-size:0px;padding:20px 0;text-align:center;">  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:100px;"> <img height="auto" src="/files/log/logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="100" /> </td> </tr> </tbody> </table> </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #6497b1;font-size:1px;margin:0px auto;width:100%;"> </p>  </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Arial;font-size:20px;line-height:1;text-align:center;color:#000000;">Reserva - Booking</div> </td> </tr> <tr> <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">For Admin<br></br><br></br>Nueva entrada para reserva de ' + req.body.name + ' con correo ' + req.body.email + ' con movil ' + req.body.phone + ', su mensaje:<br></br><br></br>' + req.body.message + '<br></br><br></br> para tipo ' + req.body.request_type + '</div> </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #6497b1;font-size:1px;margin:0px auto;width:100%;"> </p>  </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000;">Reflow Copyright 2022</div> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  <div style="background:#fbfbfb;background-color:#fbfbfb;margin:0px auto;max-width:600px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fbfbfb;background-color:#fbfbfb;width:100%;"> <tbody> <tr> <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="https://191n.mj.am/img/191n/3s/x0l.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="https://191n.mj.am/img/191n/3s/x01.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="https://191n.mj.am/img/191n/3s/x0s.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  </div> </body> </html>'
	};

	transporter.sendMail(mailOptionsCompany, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
	  }
	});

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
		res.redirect('/failure');
	  } else {
		console.log('Email sent: ' + info.response);
		res.redirect('/success');
	  }
	});
});

// Password Resetting
app.route('/resetpassword').post(function (req, res, next) {

	// Create Encrypted ID
	var encrypted = CryptoJS.AES.encrypt(req.body.email, "Tovape");
	encrypted = encodeURIComponent(encrypted)
	console.log(encrypted.toString())
	

	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
		user: 'reflowcompany@gmail.com',
		pass: 'jfqnfpdmiddfntfk'
	  }
	});

	var mailOptions = {
		from: 'reflowcompany@gmail.com',
		to: req.body.email,
		subject: 'Reflow | Cambiar Contraseña - Change Password',
		html: '<!doctype html> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <title> </title>  <meta http-equiv="X-UA-Compatible" content="IE=edge">  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> #outlook a { padding: 0; } body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, td { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; } img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; } p { display: block; margin: 13px 0; } </style>    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"> <style type="text/css"> @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700); </style>  <style type="text/css"> @media only screen and (min-width:480px) { .mj-column-per-100 { width: 100% !important; max-width: 100%; } .mj-column-per-33-333333333333336 { width: 33.333333333333336% !important; max-width: 33.333333333333336%; } } </style> <style media="screen and (min-width:480px)"> .moz-text-html .mj-column-per-100 { width: 100% !important; max-width: 100%; } .moz-text-html .mj-column-per-33-333333333333336 { width: 33.333333333333336% !important; max-width: 33.333333333333336%; } </style> <style type="text/css"> @media only screen and (max-width:480px) { table.mj-full-width-mobile { width: 100% !important; } td.mj-full-width-mobile { width: auto !important; } } </style> <style type="text/css"> .box-shadow table td { -webkit-box-shadow: 0px 3px 6px #6497b1; box-shadow: 0px 3px 6px #6497b1; } </style> </head> <body style="word-spacing:normal;"> <div style="">  <div style="margin:0px auto;max-width:600px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> <tbody> <tr> <td style="border:1px solid #000000;direction:ltr;font-size:0px;padding:20px 0;text-align:center;">  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:100px;"> <img height="auto" src="http://localhost:5000/logo/logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="100" /> </td> </tr> </tbody> </table> </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #6497b1;font-size:1px;margin:0px auto;width:100%;"> </p>  </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Arial;font-size:20px;line-height:1;text-align:center;color:#000000;">Cambio de Contraseña - Change Password</div> </td> </tr> <tr> <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">Hola ' + req.body.email + '!<br></br>Hemos recibido una petición para cambiar tu contrasenya para la plataforma de reflow, si no has sido tu no hace falta que hagas nada.</div> </td> </tr> <tr> <td align="center" vertical-align="middle" class="box-shadow" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;"> <tbody> <tr> <td align="center" bgcolor="#6497b1" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#6497b1;" valign="middle"> <a href="http://localhost:5000/newpassword?ref=' + encrypted + '" style="display:inline-block;background:#6497b1;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;" target="_blank"> Cambiar </a> </td> </tr> </tbody> </table> </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #6497b1;font-size:1px;margin:0px auto;width:100%;"> </p>  </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000;">Reflow Copyright 2022</div> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  <div style="background:#fbfbfb;background-color:#fbfbfb;margin:0px auto;max-width:600px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fbfbfb;background-color:#fbfbfb;width:100%;"> <tbody> <tr> <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="http://localhost:5000/icons/linkedin.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="http://localhost:5000/icons/youtube.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="http://localhost:5000/icons/mail.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  </div> </body> </html>'
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
		res.redirect('/failure');
	  } else {
		console.log('Email sent: ' + info.response);
		res.redirect('/success');
	  }
	});
});

app.route('/newpassword').post(async function (req, res, next) {
	
	// Get Email
	var decrypted = CryptoJS.AES.decrypt(req.body.encrypted, "Tovape");
	var email = decrypted.toString(CryptoJS.enc.Utf8);

	// Get Password Inputed
	const hashedPassword = await bcrypt.hash(req.body.password, 10)

	try {
		let query = "UPDATE users SET password = '" + hashedPassword + "' WHERE email = '" + email + "'";

		db.query(query, function (err, result, fields) {
			if (err)  {
				throw err;
			} else {
				console.log("User Updated Correctly")
			}
		});

		res.redirect('/success')
	} catch {
		res.redirect('/failure')
	}
});

// Port

console.log("Server Started on port " + PORT);
app.listen(PORT);

// Ikea Checker

/*
(async function() {
    const result = await ikeachecker.availability('394', '00501436');
    console.log('RESULT', result);
})();
*/