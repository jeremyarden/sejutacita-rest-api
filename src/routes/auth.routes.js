const express = require('express');

const controller = require('../controllers/auth.controller');

const router = express.Router();

router.use(function(req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Post user sign-up data
 *     description: Send user sign-up data (username, password, role)
 *     requestBody:
 *       description: User data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               username: asdfgh
 *               password: 123456
 *               roles: ["user", "admin"]
 *     tags:
 *       - Auth
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Server Error
 */
router.post('/signup', controller.signUp);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Post user sign-in data
 *     description: Send user sign-in data
 *     requestBody:
 *       description: User data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             username: asdfgh
 *             password: 123456
 *     tags:
 *       - Auth
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful
 *       404:
 *         description: User Not Found
 *       500:
 *         description: Server Error
 */
router.post('/signin', controller.signIn);

module.exports = router;
