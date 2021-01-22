const bcrypt = require('bcryptjs');
const db = require('../models');

const User = db.user;
const Role = db.role;

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

exports.userBoard = (req, res) => {
  res.status(200).send('User Content.');
};

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

exports.createUser = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: 'User created successfully' });
          });
        }
      );
    } else {
      Role.findOne({ name: 'user '}, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: 'User created successfully' });
        });
      });
    }
  });
};

exports.readAll = (req, res) => {
  User.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error ocurred while retrieving data'
      });
    });
};

exports.readById = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error ocurred while retrieving data'
      });
    });
}

exports.updateUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update cannot be empty'
    });
  }

  const { id } = req.params;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update tutorial with id=${id}. Maybe user was not found`
        });
      } else res.send({ message: 'User was updated successfully' });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating user with id=' + id
      });
    });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete tutorial with id=${id}. Maybe user was not found`
        });
      } else res.send({ message: 'User was deleted successfully' });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error deleting user with id=' + id
      });
    });
}

exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} user(s) deleted`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Error ocurred'
      });
    });
};
