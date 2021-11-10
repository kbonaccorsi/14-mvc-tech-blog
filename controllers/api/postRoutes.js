const router = require('express').Router();
const { Post, User } = require('../../models');
const { update } = require('../../models/User');
const withAuth = require('../../utils/auth');

//get all posts
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

        const posts = dbPostData.map((post) => 
            post.get({ plain: true }));
        //pass data and session information into template
        res.render('homepage', {
            layout:'main',
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//make a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});




//edit a specific post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const [rows] = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (rows > 0) {
            res.status(200).end();
        } else {
            res.status(404).json({ message: 'No post found with this id' });
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

//delete a specific post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const [rows] = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (rows > 0) {
            res.status(200).end();
        } else {
            res.status(404).json({ message: 'No post found with this id' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;