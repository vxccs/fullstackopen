require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to', url);
mongoose
  .connect(url)
  .then((res) => {
    console.log('connected to MongoDB');
  })
  .catch((e) => {
    console.log('error connecting to MongoDB:', e.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
