const express = require('express');

const { authJwt } = require('./middlewares');
const controller = require('./controller');

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
 * /user/createUser:
 *   post:
 *     summary: Post user creation data
 *     description: Send user creation data (username, password, role)
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
 *       - User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Server Error
 */
router.post(
  '/createUser',
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.createUser
);

/**
 * @swagger
 * /user/readAll:
 *   get:
 *     summary: Get all user data
 *     description: Return all user data (username, password, role)
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Server Error
 */
router.get('/readAll', controller.readAll);

/**
 * @swagger
 * /user/readById/{id}:
 *   get:
 *     summary: Get specific user data
 *     description: Return specific user data (username, password, role)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Numeric ID of a user
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Server Error
 */
router.get('/readById/:id', controller.readById);

/**
 * @swagger
 * /user/updateUser/{id}:
 *   put:
 *     summary: Update specific user data
 *     description: Change specific user data (username, password, role)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Numeric ID of a user
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful
 *       400:
 *         description: Empty Data
 *       404:
 *         description: User Not Found
 *       500:
 *         description: Server Error
 */
router.put(
  '/updateUser/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.updateUser
);

/**
 * @swagger
 * /user/deleteUser/{id}:
 *   delete:
 *     summary: Delete specific user data
 *     description: Remove specific user data (username, password, role)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Numeric ID of a user
 *     tags:
 *       - User
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
router.delete(
  '/deleteUser/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.deleteUser
);

/**
 * @swagger
 * /user/deleteAll:
 *   delete:
 *     summary: Delete all user data
 *     description: Remove all user data (username, password, role)
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Server Error
 */
router.delete(
  '/deleteAll',
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.deleteAll
);

module.exports = router;