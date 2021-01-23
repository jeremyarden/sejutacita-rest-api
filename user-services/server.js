const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const dbConfig = require('./config/db.config');

const userEndpoint = require('./routes');

const app = express();

const PORT = process.env.USER_PORT || 8088;

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', userEndpoint);

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});

const db = require('./models');

const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    initial();
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'user',
      }).save(err => {
        if (err) {
          console.log('error', err);
        }

        console.log('added user to role collection');
      });

      new Role({
        name: 'admin',
      }).save(err => {
        if (err) {
          console.log('error', err);
        }

        console.log('added admin to role collection');
      });
    }
  });
}
