const express = require('express');
const fs = require('fs');
const app = express();

const port = 3000;

app.use(express.json());

//variable and then http method
//url and request, response variables
// app.get('/', (req, res) => {
//   //   res.status(200).send('Hello From the server side!');
//   res.status(200).json({ message: 'Hello from server side!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post in this endpoint...');
// });

//we specify the api version in case we want to make changes
//and someone else is still using the v1 or solving problems
//Router handler

//we need to read the data first
//We parse the json into an JS object to handle it
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `{__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
