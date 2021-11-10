const router = require('express').Router();
const signupRoutes = require('./signupRoutes');
const postRoutes = require('./postRoutes');
const loginRoutes = require('./loginRoutes');
const logoutRoutes = require('./logoutRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/signup', signupRoutes);
router.use('/posts', postRoutes);
router.use('/login', loginRoutes);
router.use('/logout', logoutRoutes);
router.use('/comments', commentRoutes);

module.exports = router;