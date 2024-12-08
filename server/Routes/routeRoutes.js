// const express = require('express');
// const router = express.Router();
// const routeController = require('../Controllers/routeController');
// const auth = require('../Middleware/auth');
// const rateLimit = require('../middleware/rateLimit');

// // Apply authentication middleware to all routes
// router.use(auth);

// // Apply rate limiting to route generation
// router.post(
//   '/generate-route',
//   rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100 // limit each IP to 100 requests per windowMs
//   }),
//   routeController.generateRoute.bind(routeController)
// );

// // Route management endpoints
// router.get('/routes/:id', routeController.getRoute.bind(routeController));
// router.put('/routes/:id/update', routeController.updateRoute.bind(routeController));
// router.delete('/routes/:id', routeController.deleteRoute.bind(routeController));

// module.exports = router;