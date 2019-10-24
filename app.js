require('dotenv').config();
require('express-group-routes');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// routes
const indexRoutes = require('./routes/index');
const sanstoonRoutes = require('./routes/santoon');
const userRoutes = require('./routes/user');

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.group('/api/v1', routes => {
  routes.use('/', indexRoutes);
  routes.use('/santoons', sanstoonRoutes);
  routes.use('/user', userRoutes);
});

app.listen(port, () => console.log('App listening on port', port));
