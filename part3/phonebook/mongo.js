const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('please include password');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://vicc:${password}@cluster0.xub0rjb.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  console.log('phonebook:');
  Person.find({}).then((res) => {
    res.forEach((person) => console.log(person.name, person.number));
    mongoose.connection.close();
  });
}

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((res) => {
    console.log(
      `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
    );
    mongoose.connection.close();
  });
}
