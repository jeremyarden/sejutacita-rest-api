const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const apiEndpoint = require('./routes/api.routes');

const app = express();

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.json(['Tony', 'Lisa', 'Michael']);
});
