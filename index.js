

const express = require('express');
const app = express();
const port = 3000; // You can choose any available port


const checkTimeMiddleware = (req, res, next) => {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const hours = currentDate.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hours >= 9 && hours < 17) {
    next(); // Continue with the request if within working hours
  } else {
    res.send('The application is only available during working hours (Mon-Fri, 9am-5pm).');
  }
};


app.use(express.static('public'));

// Middleware to check the time for all routes
app.use(checkTimeMiddleware);

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/views/services.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/views/contact.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
