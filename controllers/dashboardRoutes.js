const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

//display dashboard only after logging in
router.get('/dashboard', withAuth, async (req, res) => {
  try {
      const dbUserData = await User.findByPk(req.session.user_id, {
          attributes: [
            'id',
            'username'
          ],
          include: [
            {
            model: Post,
            attributes: [
              'id',
              'title',
              'content',
              'created'
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
      const user = dbUserData.get({ plain: true });
      res.render('dashboard', {
          user,
          loggedIn: true
      });
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;