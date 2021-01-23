const express = require('express');
const axios = require('axios');

const router = express.Router();

const baseURL = 'http://userapi:8088';

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
router.post('/createUser', (req, res) => {
  let URL = baseURL + '/createUser';

  if (!req.get('x-access-token')) {
    res.send({
      message: 'No token provided',
    });
    return;
  }

  let axiosConfig = {
    headers: {
      'x-access-token': req.get('x-access-token'),
    }
  }

  axios.post(URL, req.body, axiosConfig)
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      console.log(err);
      res.send(err.response.data);
    });
});
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

router.get('/readAll', (req, res) => {
  let URL = baseURL + '/readAll';

  axios.get(URL, {
    params: { ...req.query }, //Fetch datas from params
  })
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      res.send(err.response.data);
    });
});

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
router.get('/readById/:id', (req, res) => {
  let { id } = req.params;
  let URL = baseURL + '/readById/' + id;

  axios.get(URL, {
    params: { ...req.query }, //Fetch datas from params
  })
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      res.send(err.response.data);
    });
});

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
router.put('/updateUser/:id', (req, res) => {
  let { id } = req.params;
  let URL = baseURL + '/updateUser/' + id;

  if (!req.get('x-access-token')) {
    res.send({
      message: 'No token provided',
    });
    return;
  }

  let axiosConfig = {
    headers: {
      'x-access-token': req.get('x-access-token'),
    }
  }

  axios.put(URL, req.body, axiosConfig)
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      res.send(err.response.data);
    });
});

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
router.delete('/deleteUser/:id', (req, res) => {
  let { id } = req.params;
  let URL = baseURL + '/deleteUser/' + id;

  if (!req.get('x-access-token')) {
    res.send({
      message: 'No token provided',
    });
    return;
  }

  let axiosConfig = {
    headers: {
      'x-access-token': req.get('x-access-token'),
    }
  }

  axios.delete(URL, req.body, axiosConfig)
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      res.send(err.response.data);
    });
});

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
router.delete('/deleteAll', (req, res) => {
  let { id } = req.params;
  let URL = baseURL + '/deleteAll';

  if (!req.get('x-access-token')) {
    res.send({
      message: 'No token provided',
    });
    return;
  }

  let axiosConfig = {
    headers: {
      'x-access-token': req.get('x-access-token'),
    }
  }

  axios.delete(URL, req.body, axiosConfig)
    .then(result => {
      res.send(result.data || result.response.data);
    })
    .catch(err => {
      res.send(err.response.data);
    });
});

module.exports = router;