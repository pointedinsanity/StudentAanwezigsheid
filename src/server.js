require('dotenv').config();
const express = require('express');
const app = express();
const studentRoutes = require('./routes/studentRoutes');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }));

app.use('/', studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
