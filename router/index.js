const express = require('express');
const controller = require('../controllers/private/modelController');
const {defaultResponseHandler} = require('../output');
const userController = require('../controllers/private/users');
const logger = require('../middlewares/private/logger');
const router = express.Router();
const authenticate = require('../middlewares/private/authentication');
const internalAuthenticate = require('../middlewares/private/internal-authentication');



router.get('/', function (req, res) {
    defaultResponseHandler({res, req, logger, data:{ status:200 } });
});

router.get('/compute/:model/:key', authenticate, async function (req, res) {
    const {model,key} = req.params;
    const data = await  controller.callRead(req, res, { model, key });
    defaultResponseHandler({res, req, logger, data });
});


router.post('/compute/:model/:key', authenticate, async function (req, res) {
    const { model, key } = req.params;
    const data = await  controller.callWrite(req, res, { model, key });
    defaultResponseHandler({res, req, logger, data });
});


router.post('/users', internalAuthenticate, async function (req, res) {
    const data = await  userController.create(req, res);
    defaultResponseHandler({res, req, logger, data });
});


router.get('/users/:key', authenticate, async function (req, res) {
    const { key } = req.params;
    const data = await  userController.get(req, res, { key });
    defaultResponseHandler({res, req, logger, data });
});

module.exports = router;
