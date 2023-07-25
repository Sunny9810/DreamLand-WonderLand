const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  size: [
    {
      type: String,
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;


//* this file creates the Category model and defines the structure of each category document.
//* we will use categories to filter our products between baby, kids, adult.
//* the product model refrences 1 catagory, meaning a product can have a category of baby.
//* with the refrence, when queried products will have the category embedded inside its data
//* allowing us to filter by category or display the sizes available to that product through that category 