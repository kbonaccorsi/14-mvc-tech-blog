const router = require('express').Router();
const userRoutes = require('./user-routes');
const blogRoutes = require('./blogRoutes');

router.use('/users', userRoutes);
router.use('/blog', blogRoutes);

module.exports = router;