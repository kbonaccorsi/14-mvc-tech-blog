const router = require('express').Router();
const { User } = require('../../models');
const dbUserData = [];
//create new user
router.post('/', async(req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;

            res.status(200).json(newUser);
            dbUserData.push(newUser);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;