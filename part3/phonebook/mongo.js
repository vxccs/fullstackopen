const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("please provide the password as an argument: node mongo.js <password>");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://vicc:${password}@cluster0.xub0rjb.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  // show all entries
  mongoose.connect(url).then((result) => {
    Person.find({}).then((people) => {
      console.log("phonebook:");
      people.forEach((person) => {
        console.log(person.name, person.number);
      });
      mongoose.connection.close();
    });
  });
}

if (process.argv.length === 5) {
  // add entry
  mongoose
    .connect(url)
    .then((result) => {
      console.log("connected!");

      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      });

      return person.save();
    })
    .then(() => {
      console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`);
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}
