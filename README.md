# 14-mvc-tech-blog
Build a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well.


GitHub repo:
Heroku deployment:





*homepage/ :id
{{#if}} html to display {{/if}}
    *navbar
        *homepage
        *dashboard
        *logout
        *{{user.name}}
    *body
        *title
        *content
        *creator's username
        *date created
        *button: leave a comment
            *active: opens a text field
            *submit
                *comment saves
                *post updates(refreshes :id)
                    *comment
                    *creator's username
                    *date created


*new post
    *form
        *title
        *content
    *button create post
        *saves post
        *redirect to a refreshed dashboard


*dashboard/:id
    *button update
        *update title
        *update content
        *save
            *redirect to refreshed dashboard
    *button delete
        *redirect to refreshed dashboard


*logout(when logged in)- active link: redirects to homepage
    *delete session


WHEN I am idle on the site for more than a set time
THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments



<!-- completed tasks 
*Install packages
    VIEWS
        *[express-handlebars](https://www.npmjs.com/package/express-handlebars) - VIEWS

    MODELS
        *[MySQL2](https://www.npmjs.com/package/mysql2)
        *[Sequelize](https://www.npmjs.com/package/sequelize)
        
    CONTROLLERS
        *create an Express.js API
            *const express = require('express');

    npm install:
        *[dotenv package](https://www.npmjs.com/package/dotenv)
        *[bcrypt package](https://www.npmjs.com/package/bcrypt)
        *[express-session](https://www.npmjs.com/package/express-session)
        *[connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize)






-->