var express = require('express')
var marker_router = express.Router();
var marker_ctrl = require('../controllers/marker_ctrl.js');

marker_router.get('/markers', marker_ctrl.index);
marker_router.get('/markers/:id', marker_ctrl.show);
marker_router.post('/markers/:id', marker_ctrl.create);
marker_router.patch('/markers/:id', marker_ctrl.edit_marker);
marker_router.delete('/markers/:id', marker_ctrl.delete_marker);

module.exports = marker_router;