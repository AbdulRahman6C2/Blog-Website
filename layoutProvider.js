module.exports = function (app) {
    app.use((req, res, next) => {
        if (req.url.startsWith('/admin')) {
            res.locals.layout = 'layouts/admin';
        } else {
            res.locals.layout = 'layouts/main';
        }
        next();
    });
};
