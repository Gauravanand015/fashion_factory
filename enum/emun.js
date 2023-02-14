const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const MySchema = new Schema({
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected']
  }
});
