TDD, Nodejs Server API server 개발 1
==================================
Author : SangMin LEE

api/user로 분리된 API에서 Controller단 분리
------------------------------

### 1. user.ctrl.js 추가 ###

**{Projectfolder}/api/user/user.ctrl.js 예시**


    let users = [
        {id: 1, name: 'Alice'},
        {id: 2, name: 'Bek'},
        {id: 3, name: 'Chris'}
    ]

    const index =(req,res) => {

        req.query.limit = req.query.limit || 10;
        const limit = parseInt(req.query.limit, 10);
        console.log("limit:", limit)
        if (Number.isNaN(limit)){
            res.status(400).end();
        }
        else {
            res.json(users.slice(0, limit));
        }
    }

    const show = (req,res) =>{

        const id  = parseInt(req.params.id, 10);
        if (Number.isNaN(id))
        {
            return res.status(400).end();
        }
        const user = users.filter(user => user.id === id)[0];

        if (!user){
            return res.status(404).end();
        }

        res.json(user);
    }


### 2. {Projectfolder}/api/user/index.js 변경 ###

**{Projectfolder}/api/user/index.js 예시**

    const express = require('express');
    const router = express.Router();
    const ctrl = require('./user.ctrl');

    router.get('/', ctrl.index);
    router.get('/:id', ctrl.show);

    module.exports = router;

### 3. {Projectfolder}/index.js 변경 ###

**{Projectfolder}/index.js 예시**

    var express = require('express');
    var morgan = require('morgan');
    var bodyParser = require('body-parser');
    var app = express();
    var user = require('./api/user');
    
    if (process.env.NODE_ENV !== 'test')
    {
        app.use(morgan('dev'));
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/users', user);

    module.exports = app;



