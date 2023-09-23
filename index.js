const express = require('express');
const app = express();
const port = 3000; // You can change this to any port you prefer

// Require your API routes from the routes folder
const apiRoutes = require('./routes/api');

// Use your API routes
app.use('/api', apiRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
