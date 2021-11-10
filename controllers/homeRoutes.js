const router = require('express').Router();
const { Post, User } = require('../models');

//display all posts on the homepage
router.get('/', async (req, res) => {
    try {
        //get all posts and JOIN with user data
        const dbPostData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: { exclude: ['password'] },
                },
            ],
        });

        const posts = await dbPostData.map((post) => {
            post.get({ plain: true })
        });
        //pass data and session information into template
        res.render('homepage', {
            layout: "main",
            dbPostData,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//view a post with a specific id
router.get('/post/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const post = dbPostData.get({ plain: true });

        res.render('post', {
            ...post,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
    res.status(500).json(err);
}
});


module.exports = router;