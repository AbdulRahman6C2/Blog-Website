require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const layoutProvider = require('./layoutProvider');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const connectDB = require('./server/config/db');

const app = express();
const PORT = 5000 || process.env.PORT;


connectDB();
const { isActiveRoute } = require('./server/helpers/routeHelpers');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUnitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }), 

}));
app.use(express.static('public'));


app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

layoutProvider(app);

app.locals.isActiveRoute = isActiveRoute;


app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));


app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`);
});