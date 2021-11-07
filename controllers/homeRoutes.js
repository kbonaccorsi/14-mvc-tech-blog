const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');

//display all posts on the homepage
router.get('/', async (req, res) => {
    try {
        //get all posts and include user/comment data
        const dbPostData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'created'
            ],
            include: [
                {
                    model: User,
                    attributes: [
                        'id',
                        'username'
                    ]
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'content',
                        'created',
                        'post_id',
                        'user_id'
                    ],
                    include: {
                        model: User,
                        attributes: [
                            'id',
                            'username'
                        ],
                    },
                },
            ],
        });
        //serialize data so the template can read it
        const posts = dbPostData.map((post) => {
            post.get({ plain: true })
        });
        //pass serialized data and session information into template
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//If already logged in, redirect to another route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

//find a post with a specific id, and display it with user/comment data
router.get('/post/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
            attributes: [
                'id',
                'title',
                'content',
                'created'
            ],
            include: [
                {
                    model: User,
                    attributes: [
                        'id',
                        'username'
                    ],
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'content',
                        'created',
                        'post_id',
                        'user_id'
                    ],
                    include: {
                        model: User,
                        attributes: [
                            'id',
                            'username'
                        ],
                    },
                },
            ],
        });
        //if there's no post with that id
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id'});
            return;
        }
        //serialize data so the template can read it
        const post = dbPostData.get({ plain: true })
        res.render('post', {
            post,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;