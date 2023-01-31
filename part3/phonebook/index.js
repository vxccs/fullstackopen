require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.static('build'));
app.use(cors());

const Person = require('./models/person');

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

// get info
app.get('/info/', (req, res) => {
  Person.countDocuments({}, (err, count) => {
    res.send(`<p>Phonebook has info for ${count} people</p>
              <p>${new Date()}</p>`);
  });
});

// get all items
app.get('/api/persons/', (req, res) => {
  Person.find({}).then((resu) => res.json(resu));
});

// get single item
app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then((person) => res.json(person));
});

// create new item
app.post('/api/persons', (req, res) => {
  const { body } = req;

  if (!body.name || !body.number)
    return res.status(400).json({ error: 'missing content' });

  const person = new Person({
    id: Math.floor(Math.random() * 10000),
    name: body.name,
    number: body.number,
  });

  person.save().then((person) => res.json(person));
});

// app.delete('/api/persons/:id', (req, res) => {
//   const id = Number(req.params.id);
//   persons = persons.filter((p) => p.id !== id);

//   res.status(204).end();
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
