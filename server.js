require('dotenv').config()
const mysql = require("mysql")
const express = require('express')
const path = require('path')
const app = express()
const nodemailer = require('nodemailer');
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

// Send Contact/Booking Form Mail
app.route('/contactform').post(function (req, res, next) {

	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
		user: 'reflowcompany@gmail.com',
		pass: 'jfqnfpdmiddfntfk'
	  }
	});

	var mailOptions = {
		from: 'reflowcompany@gmail.com',
		to: 'reflowcompany@gmail.com',
		subject: 'Reflow | User Contact',//change html for contact sample with name req.body.name email req.body.name and message req.body.message
		html: '<!doctype html> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <title> </title>  <meta http-equiv="X-UA-Compatible" content="IE=edge">  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> #outlook a { padding: 0; } body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, td { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; } img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; } p { display: block; margin: 13px 0; } </style>    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"> <style type="text/css"> @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700); </style>  <style type="text/css"> @media only screen and (min-width:480px) { .mj-column-per-100 { width: 100% !important; max-width: 100%; } .mj-column-per-33-333333333333336 { width: 33.333333333333336% !important; max-width: 33.333333333333336%; } } </style> <style media="screen and (min-width:480px)"> .moz-text-html .mj-column-per-100 { width: 100% !important; max-width: 100%; } .moz-text-html .mj-column-per-33-333333333333336 { width: 33.333333333333336% !important; max-width: 33.333333333333336%; } </style> <style type="text/css"> @media only screen and (max-width:480px) { table.mj-full-width-mobile { width: 100% !important; } td.mj-full-width-mobile { width: auto !important; } } </style> <style type="text/css"> .box-shadow table td { -webkit-box-shadow: 0px 3px 6px #6497b1; box-shadow: 0px 3px 6px #6497b1; } </style> </head> <body style="word-spacing:normal;"> <div style="">  <div style="margin:0px auto;max-width:600px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> <tbody> <tr> <td style="border:1px solid #000000;direction:ltr;font-size:0px;padding:20px 0;text-align:center;">  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:100px;"> <img height="auto" src="http://localhost:5000/logo/logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="100" /> </td> </tr> </tbody> </table> </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #6497b1;font-size:1px;margin:0px auto;width:100%;"> </p>  </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Arial;font-size:20px;line-height:1;text-align:center;color:#000000;">Cambio de Contraseña - Change Password</div> </td> </tr> <tr> <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">Hola Tovape!<br></br>Hemos recibido una petición para cambiar tu contrasenya para la plataforma de reflow, si no has sido tu no hace falta que hagas nada.</div> </td> </tr> <tr> <td align="center" vertical-align="middle" class="box-shadow" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;"> <tbody> <tr> <td align="center" bgcolor="#6497b1" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#6497b1;" valign="middle"> <a href="#" style="display:inline-block;background:#6497b1;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;" target="_blank"> Cambiar </a> </td> </tr> </tbody> </table> </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #6497b1;font-size:1px;margin:0px auto;width:100%;"> </p>  </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000;">Reflow Copyright 2022</div> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  <div style="background:#fbfbfb;background-color:#fbfbfb;margin:0px auto;max-width:600px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fbfbfb;background-color:#fbfbfb;width:100%;"> <tbody> <tr> <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="http://localhost:5000/icons/linkedin.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="http://localhost:5000/icons/youtube.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="http://localhost:5000/icons/mail.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  </div> </body> </html>'
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

app.route('/bookingform').post(function (req, res, next) {

	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
		user: 'reflowcompany@gmail.com',
		pass: 'jfqnfpdmiddfntfk'
	  }
	});

	var mailOptions = {
		from: 'reflowcompany@gmail.com',
		to: 'reflowcompany@gmail.com',
		subject: 'Reflow | User Booking',//change html for booking sample with name req.body.name email req.body.name message req.body.message phone req.body.phone and request request_type
		html: '<!doctype html> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <title> </title>  <meta http-equiv="X-UA-Compatible" content="IE=edge">  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> #outlook a { padding: 0; } body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, td { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; } img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; } p { display: block; margin: 13px 0; } </style>    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"> <style type="text/css"> @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700); </style>  <style type="text/css"> @media only screen and (min-width:480px) { .mj-column-per-100 { width: 100% !important; max-width: 100%; } .mj-column-per-33-333333333333336 { width: 33.333333333333336% !important; max-width: 33.333333333333336%; } } </style> <style media="screen and (min-width:480px)"> .moz-text-html .mj-column-per-100 { width: 100% !important; max-width: 100%; } .moz-text-html .mj-column-per-33-333333333333336 { width: 33.333333333333336% !important; max-width: 33.333333333333336%; } </style> <style type="text/css"> @media only screen and (max-width:480px) { table.mj-full-width-mobile { width: 100% !important; } td.mj-full-width-mobile { width: auto !important; } } </style> <style type="text/css"> .box-shadow table td { -webkit-box-shadow: 0px 3px 6px #6497b1; box-shadow: 0px 3px 6px #6497b1; } </style> </head> <body style="word-spacing:normal;"> <div style="">  <div style="margin:0px auto;max-width:600px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> <tbody> <tr> <td style="border:1px solid #000000;direction:ltr;font-size:0px;padding:20px 0;text-align:center;">  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:100px;"> <img height="auto" src="http://localhost:5000/logo/logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="100" /> </td> </tr> </tbody> </table> </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #6497b1;font-size:1px;margin:0px auto;width:100%;"> </p>  </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Arial;font-size:20px;line-height:1;text-align:center;color:#000000;">Cambio de Contraseña - Change Password</div> </td> </tr> <tr> <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">Hola Tovape!<br></br>Hemos recibido una petición para cambiar tu contrasenya para la plataforma de reflow, si no has sido tu no hace falta que hagas nada.</div> </td> </tr> <tr> <td align="center" vertical-align="middle" class="box-shadow" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;"> <tbody> <tr> <td align="center" bgcolor="#6497b1" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#6497b1;" valign="middle"> <a href="#" style="display:inline-block;background:#6497b1;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;" target="_blank"> Cambiar </a> </td> </tr> </tbody> </table> </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #6497b1;font-size:1px;margin:0px auto;width:100%;"> </p>  </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000;">Reflow Copyright 2022</div> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  <div style="background:#fbfbfb;background-color:#fbfbfb;margin:0px auto;max-width:600px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fbfbfb;background-color:#fbfbfb;width:100%;"> <tbody> <tr> <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="http://localhost:5000/icons/linkedin.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="http://localhost:5000/icons/youtube.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="http://localhost:5000/icons/mail.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  </div> </body> </html>'
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

// Password Resetting
app.route('/passwordreset').post(function (req, res, next) {

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
		html: '<!doctype html> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <title> </title>  <meta http-equiv="X-UA-Compatible" content="IE=edge">  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> #outlook a { padding: 0; } body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, td { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; } img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; } p { display: block; margin: 13px 0; } </style>    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"> <style type="text/css"> @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700); </style>  <style type="text/css"> @media only screen and (min-width:480px) { .mj-column-per-100 { width: 100% !important; max-width: 100%; } .mj-column-per-33-333333333333336 { width: 33.333333333333336% !important; max-width: 33.333333333333336%; } } </style> <style media="screen and (min-width:480px)"> .moz-text-html .mj-column-per-100 { width: 100% !important; max-width: 100%; } .moz-text-html .mj-column-per-33-333333333333336 { width: 33.333333333333336% !important; max-width: 33.333333333333336%; } </style> <style type="text/css"> @media only screen and (max-width:480px) { table.mj-full-width-mobile { width: 100% !important; } td.mj-full-width-mobile { width: auto !important; } } </style> <style type="text/css"> .box-shadow table td { -webkit-box-shadow: 0px 3px 6px #6497b1; box-shadow: 0px 3px 6px #6497b1; } </style> </head> <body style="word-spacing:normal;"> <div style="">  <div style="margin:0px auto;max-width:600px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> <tbody> <tr> <td style="border:1px solid #000000;direction:ltr;font-size:0px;padding:20px 0;text-align:center;">  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:100px;"> <img height="auto" src="http://localhost:5000/logo/logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="100" /> </td> </tr> </tbody> </table> </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #6497b1;font-size:1px;margin:0px auto;width:100%;"> </p>  </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Arial;font-size:20px;line-height:1;text-align:center;color:#000000;">Cambio de Contraseña - Change Password</div> </td> </tr> <tr> <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">Hola ' + req.body.name + '!<br></br>Hemos recibido una petición para cambiar tu contrasenya para la plataforma de reflow, si no has sido tu no hace falta que hagas nada.</div> </td> </tr> <tr> <td align="center" vertical-align="middle" class="box-shadow" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;"> <tbody> <tr> <td align="center" bgcolor="#6497b1" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#6497b1;" valign="middle"> <a href="#" style="display:inline-block;background:#6497b1;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;" target="_blank"> Cambiar </a> </td> </tr> </tbody> </table> </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #6497b1;font-size:1px;margin:0px auto;width:100%;"> </p>  </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000;">Reflow Copyright 2022</div> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  <div style="background:#fbfbfb;background-color:#fbfbfb;margin:0px auto;max-width:600px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fbfbfb;background-color:#fbfbfb;width:100%;"> <tbody> <tr> <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="http://localhost:5000/icons/linkedin.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="http://localhost:5000/icons/youtube.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="http://localhost:5000/icons/mail.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  </div> </body> </html>'
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

// Port
console.log("Server Started on port " + PORT);
app.listen(PORT);