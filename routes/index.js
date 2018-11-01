const express = require('express');
const controller = require('../controllers/private/modelController');
const userController = require('../controllers/private/users');
const router = express.Router();
const authenticate = require('../middlewares/private/authentication');
const internalAuthenticate = require('../middlewares/private/internal-authentication');

// Home page route.
router.get('/', function (req, res) {
    res.send('center is working');
})

router.get('/compute/:model/:key', authenticate, async function (req, res) {
    const {model,key} = req.params;
    const resp = await  controller.callRead(req, res, {model,key});
    res.send({data:resp})
})

// Home page route.
router.post('/compute/:model/:key', authenticate, async function (req, res) {
    const { model, key } = req.params;
    const resp = await  controller.callWrite(req, res, { model, key });
    res.send({ data: resp });
})

// Users
router.post('/users', internalAuthenticate, async function (req, res) {
    const resp = await  userController.create(req, res);
    res.send({ data: resp });
})

//TODO this must be private
router.get('/users/:key', async function (req, res) {
    const { key } = req.params;
    const resp = await  userController.get(req, res, { key });
    res.send({ data: resp });
})

module.exports = router;
