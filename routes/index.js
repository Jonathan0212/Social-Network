const router = require('express').Router();

// API Routes
const apiRoutes = require ('./api');
const htmlRoutes = require('./html/html-routes');

// api routing from api directory 
router.use('/api', apiRoutes);
router.use('/', htmlRoutes);


router.use((req, res) => {
    res.status(404).send('<h1> 404 Error Not Found!<h1>')
});

module.exports = router;