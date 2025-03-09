const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const questionRoutes = require('./routes/questionRoutes');
const sequelize = require('./config/dbconfig');
const session = require('express-session');

const app = express();
app.use(
  session({
    secret: 'xyzz',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully');
    return sequelize.sync({ alter: true });
  })
  .then(() => console.log('Tables synchronized successfully'))
  .catch((err) => console.error('Error connecting to the database:', err));

app.use('/', questionRoutes);
const PORT = 2000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
