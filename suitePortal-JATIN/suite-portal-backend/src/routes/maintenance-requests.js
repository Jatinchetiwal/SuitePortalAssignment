const express = require('express');
const router = express.Router();
const { createRequest, getRequests, closeRequest } = require('../controllers/maintenanceRequestController');

router.post('/', createRequest);
router.get('/', getRequests);
router.put('/:id/close', closeRequest);

module.exports = router;
