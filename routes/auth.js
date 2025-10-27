const express = require('express')
const router = express.Router();
const { registrUser, loginuser } = require('../controllers/auth-controller');
router.post('/register',registrUser); // import from controller
router.post('/login',loginuser); // login of user
// getting into home page
 // controller function (middleware) for accessing of home
module.exports= router;
// post req
