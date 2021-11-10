const router = require('express').Router();

//logout
router.post('/logout', (req, res) => {
    //When user logs out, destroy the session
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;