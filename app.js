const express = require('express');
const app = express();
const port = 4000;
const fetchController = require('./Controller/FetchController');

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static("public"))


// Define a route that will render the EJS template
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/dashboard', (req, res) => {
  res.render('bashboard');
});

app.use('/api', fetchController);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
