let data = {};
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
app.use(express.static('website'));
const port = 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
app.get('/all', (req, res) => res.send(data));
app.post('/add', (req, res) => {
  data = {
    date: req.body.date,
    temp: req.body.temp,
    feel: req.body.feel,
  };
  res.send(data);
});
