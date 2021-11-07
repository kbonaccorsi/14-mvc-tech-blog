const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async(req, res) => {
    try {
        const dbUserData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.loggedIn = true;

            res.status(200).json(dbUserData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        //find the user with a specific username
        const dbUserData = await User.findOne({ where: { username: req.body.username } });

        //if no user data is found error 400
        if (!dbUserData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        //verify the posted password with the password stored in the database
        const validPassword = await dbUserData.checkPassword(req.body.password);

        //if input password doesn't match hashed password error 400
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        //Create session variables based on the logged in user
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        //remove session variables
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;