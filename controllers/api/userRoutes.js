const router = require('express').Router();
const { User } = require('../../models');
const withAuth =require('../../utils/auth');

//create new user
router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//login
router.post('/login', async (req, res) => {
    try {
        //find the user with a specific username
        const dbUserData = await User.findOne({
            where: {
                username: req.body.username
            }
        });

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

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const dbUserData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });
        const user = dbUserData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

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