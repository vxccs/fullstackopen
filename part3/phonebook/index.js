require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person');
app.use(express.static('build'));
app.use(express.json());
app.use(cors());

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// get info
app.get('/info/', (req, res) => {
  Person.find({}).then((persons) =>
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
  );
});

// get all items
app.get('/api/persons/', (req, res) => {
  Person.find({}).then((resu) => res.json(resu));
});

// get single item
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => (person ? res.json(person) : res.status(404).end()))
    .catch((e) => next(e));
});

// create new item
app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;

  const person = new Person({ name, number });

  person
    .save()
    .then((person) => res.json(person))
    .catch((e) => next(e));
});

// delete an item
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((e) => next(e));
});

// update an item
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(req.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then((person) => res.json(person))
    .catch((e) => next(e));
});

// 404 middleware
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

// error middleware
const errorHandler = (e, req, res, next) => {
  console.error(e.message);

  if (e.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (e.name === 'ValidationError') {
    return res.status(400).json({ error: e.message });
  }

  next(e);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
