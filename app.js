const express = require('express');

const app = express();

const port = 3000;

//variable and then http method
//url and request, response variables
app.get('/', (req, res) => {
  //   res.status(200).send('Hello From the server side!');
  res.status(200).json({ message: 'Hello from server side!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can post in this endpoint...');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
