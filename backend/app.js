const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');
require('express-async-errors');
const publicWebhookPaths = require('./routes/api/integrations/twilio').publicWebhookPaths;
const cron = require('node-cron');
const { checkOutgoingCalls } = require('./utils/twilio');
const twilioConfig = require('./config/twilio');

const { environment } = require('./config');
const routes = require('./routes');

const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
    app.use(cors());
}

app.use(helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
})
);

const csrfProtection = csurf({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
    }
});

app.use((req, res, next) => {
    // Skip CSRF for puiblic webhooks
    if (publicWebhookPaths.includes(req.path)) {
        return next();
    }
    return csrfProtection(req, res, next);
});

app.use(routes);

app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err.errors);
});

app.use((err, _req, _res, next) => {
    if (err instanceof ValidationError) {
        let errors = {};
        for (let error of err.errors) {
            errors[error.path] = error.message;
        }
        err.title = 'Validation error';
        err.errors = errors;
    }
    next(err);
});

app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    if (isProduction) {
        delete err.title;
        delete err.stack;
    }
    console.error(err);
    res.json({
        message: err.message,
        errors: err.errors,
    });
});

cron.schedule(`*/${twilioConfig.checkCallsInterval} * * * *`, (ctx) => {
    const ts = ctx.triggeredAt.toISOString();
    console.log(`Checking outgoing calls at ${ts}`);
    checkOutgoingCalls();
});

module.exports = app;