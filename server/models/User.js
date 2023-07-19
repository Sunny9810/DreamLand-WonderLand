const mongoose = require('mongoose');
//! importing necessary files to define the schema, hash the password, and use the Order model in "orders" field
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');  

//* userSchema defines the structure of the User model we will use to create user documents(individual users), that we will store in the User collection
//* schemas are instance objects containg fields(embedded objects) with the type of data and other properties we want set on the field, also hooks and methods
//! the orders field takes a Order and saves/embeds it in the user document as a subdocument, this makes it so you dont have to .populate or do any extra code to access their orders
const userSchema = new Schema({ 
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: { 
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  orders: [Order.schema]
});

//* before the user (user document) is saved this checks if this user is new or if password is being updated, either will hash password and then insert hashed password in the users password field
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

//* adds a method that checks incoming password with the hashed password in the User document
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

//* the User model is created taking in the name 'User' and the userSchema
const User = mongoose.model('User', userSchema);

module.exports = User;
