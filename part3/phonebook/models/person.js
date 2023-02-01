require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to', url);
mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((e) => {
    console.log('error connecting to MongoDB:', e.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (value) => /^(\d{2,3}-)*\d{7,}$/.test(value),
      message: ({ value }) => `${value} is not a valid phone number!`,
    },
    required: true,
  },
});

personSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
