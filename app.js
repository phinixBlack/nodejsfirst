const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api', require('./Controller/FetchController'));

app.get('/', require('./route/home'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
