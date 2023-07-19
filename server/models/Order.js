const mongoose = require('mongoose');

const { Schema } = mongoose;

//* when a order document is created the purchaseDate will use Date.now to log the current date in this field.
//* the products field is a array of references to their specific product document, 
//* using the ObjectID (type: schema.types.Objectid because tha value was created by MongoDB automatically)
//! this means we have to use .populate on a order query to match the ObjectID here to the ones in the product collection and insert their data in the response
const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
