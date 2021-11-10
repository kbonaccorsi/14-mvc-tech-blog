const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const dbUserData = require('./dbUserData.json');
const dbPostData = require('./dbPostData.json');
const dbCommentData = require('./dbCommentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(dbUserData, {
        individualHooks: true,
        returning: true,
    });

    for (const post of dbPostData) {
        await Post.create({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    for (const comment of dbCommentData) {
        await Comment.create({
            ...comment,
            user_id: users[Math.floor(Math.random()* users.length)].id,
        });
    }
    process.exit(0);
};

seedDatabase();