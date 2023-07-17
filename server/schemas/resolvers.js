const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
// const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    categories: async () => {                             //* returns all catagories for populating the navbar (baby, kids, adult) 
      return await Category.find();
    },
    products: async (parent, { category, name }) => {         //* returns all products, or if args are provided products matching a category or a product name
      const params = {};                                        //* achieved by this empty object, if empty there are no params/arguments so all products will be returned

      if (category) {                                         //* ex. a navlink to baby is clicked, dispatching a updatecategory action that will update the current category in the global state
        params.category = category;                               //* to the payload with the category.id held in the link/buttons unique key (<link key=category.id /> )
      }

      if (name) {                                             //* ex. in search bar the string can be passed as the name param for the query and return matching products with that name
        params.name = {
          $regex: name
        };
      }

      return await Product.find(params).populate('category');                //* the query will return a array of product documents with the category object embedded, the category holds sizes available
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');                //*  returns a single product that will carry the category object holding specific sizes available for the single product page
    },
    user: async (parent, args, context) => {                                //* context is how we will access the current authenticate/logged in user 
      if (context.user) {
        const user = await User.findById(context.user._id).populate({       //* the user will be found and will populate each order with with products and every product with its category data
          path: 'orders.products',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);        //* sorts orders in descending order

        return user;                                                        //* returns user object with all info related to them in nested objects
      }

      throw new AuthenticationError('Please log in');
    },
    order: async (parent, { _id }, context) => {                            //* returns a specific order but instead of going into the order collection
      if (context.user) {                                                     //* we take in the order _id as a argument and the context containing the logged in user info
        const user = await User.findById(context.user._id).populate({           //* we find the logged in user and pull all their data assigning it to the user const
          path: 'orders.products',
          populate: 'category'
        });

        return user.orders.id(_id);                                           //* then return the data for the user order where the id field matches _id argument (using the ".id(_id)" mongoose method)
      }

      throw new AuthenticationError('Log in to view orders');
    },
  },
  Mutation: {
    
  }
};

module.exports = resolvers;
