const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs'); 

// app.use((req, res) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});



app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'My Web Server',
    welcomeMessage: 'Hello to my website',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
})

app.get('/portfolio', (req, res) => {
  res.render('portfolio.hbs', {
    pageTitle: 'My Portfolio'
  });
})

app.get('/bad', (req, res) => {
  res.send({
    error: 'Unable to fullfil request'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${3000}`);
});

