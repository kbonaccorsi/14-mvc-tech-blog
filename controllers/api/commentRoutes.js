const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//get all comments
router.get('/', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({
      include: [User],
    });

    const comments = dbCommentData.map((comment) => comment.get({ plain: true }));

    res.render('post', {
      layout: 'comment',
      comments,
      loggedIn: req.session.loggedIn
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

//make a new comment
router.post('/', withAuth, async (req, res) => {
  try {
      const newComment = await Comment.create({
          ...req.body,
          user_id: req.session.user_id,
      });

      res.status(200).json(newComment);
  } catch (err) {
      res.status(400).json(err);
  }
});

module.exports = router;