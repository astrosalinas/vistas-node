var express = require('express');
var axios = require('axios');
var router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login', {
        title: 'Login'
    });
});

router.post('/', function (req, res, next) {
    
    let data = Buffer.from(req.body.username + ':' + req.body.password).toString('base64');
    console.log(data)
    var token = axios({
        method: 'get',
        url: 'http://204.48.23.1:5000/login',
        headers: {
            'Authorization': `Basic ${data}`,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        localStorage.setItem('token', response.data.token)
        res.redirect('/');
        
    }).catch((error) => {
        res.redirect('/login');
    });
});


module.exports = router;


/*
base64 node
console.log(Buffer.from("Hello World").toString('base64'));
console.log(Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'));
*/