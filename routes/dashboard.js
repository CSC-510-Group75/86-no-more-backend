const express = require('express');

const router = express.Router();

const roleMiddleware = require('../middleware/roleMiddleware');

// Define routes for customer and staff dashboards with role-based access control
router.get('/customer', roleMiddleware('customer'), (req, res) => {
  res.render('customerDashboard', { user: req.user });
});

router.get('/staff', roleMiddleware('staff'), (req, res) => {
  res.render('staffDashboard', { user: req.user });
});

module.exports = router;

