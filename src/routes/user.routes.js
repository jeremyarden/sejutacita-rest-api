const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/test/all', controller.allAccess);

  app.get('/api/test/user', [authJwt.verifyToken], controller.userBoard);

  app.get(
    '/api/test/admin',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.post(
    '/api/createUser',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createUser
  );

  app.get('/api/readAll', controller.readAll);

  app.get('/api/readById/:id', controller.readById);

  app.put(
    '/api/updateUser/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUser
  );

  app.delete(
    '/api/deleteUser/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteUser
  );

  app.delete(
    '/api/deleteAll',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteAll
  );
};
