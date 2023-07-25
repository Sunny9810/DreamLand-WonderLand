const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    
    categories: async () => {
        //! returns all categories
      return await Category.find();
    },

    products: async (parent, { category, name }) => {
      //! this query accepts args {category, name}, and if they exist will assign them
      //! to the empty "params" object, if they dont it will stay empty and return all products
      
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }
        //! .populate is used below because the product model category field references the specific category by objectID
        //! so the populate method will grab all that category data where id matches
        //! and give it to us in the product
      return await Product.find(params).populate('category');
    },

    product: async (parent, { _id }) => {
      //! finds one product that matches "_id" and populates the category field with the corresponding category data
      return await Product.findById(_id).populate('category');
    },

    user: async (parent, args, context) => {
    //! this query accepts the "context" argument to find the user info
      //* context is defined in the server.js where the apollo server instance is created with configuration details
      //* furthermore we are using the authMiddleware in the server context, i will explain that process below
        //! authMiddleware function checks the client req for a token,
        //! if valid token, the token data is extracted (it contains user info)
        //! and adds it to the req.user (equivalent to context.user)
        //! allowing us to access the user info through context
      //* in total its just a way to have the user info traveling with client request when theyre logged in
      //* and a way to check if use is logged in

      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });
      //! above block says if user is authenticated (token is valid therefore the user data existing in context)
      //! get user data and in orders subdocument, populate each product with category data 

          //* user orders are sorted using the sort method by purchaseDate
        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }
        //! if not logged in then error, which means authMiddleware(context) found no valid token
      throw new AuthenticationError('Not logged in');
    },

    order: async (parent, { _id }, context) => {
    //! this query takes in a order id as args and the context for user data
    //! basically the user will be found, all the data will be pulled for them and then orders will be filtered by the order id
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });
          //! here ".id(xx)" method is used to find and return the order subdocument within the user.orders array that matches the provided _id.
        return user.orders.id(_id);
      }
        //! if not logged in then error, which means authMiddleware(context) found no valid token
      throw new AuthenticationError('Not logged in');
    },

    checkout: async (parent, args, context) => {

        //! url of client request is extracted to provide success and cancel urls
      const url = new URL(context.headers.referer).origin;
        //! the products in cart will be added to a new order object
      const order = new Order({ products: args.products });
        //! line_items array is created for stripe checkout session
      const line_items = [];

        //! in the new order object all the individual product data is pulled, then the updated order data is deconstructed so we can use products
      const { products } = await order.populate('products');

        //! a loop to take each product in products and insert the values in a way stripe can use them
      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

          //! price is assigned to each "product" created above
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',
        });

          //! here each price object is added to the line_items array, price containing a reference to product created above it
        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

        //! creates the stripe session with all necessary options to display to the user what they are buying and process the payment accurately, 
        //! using the line_items array to determine the items that should be displayed and charged during the checkout process. 
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

        //! finally a object with the stripe session id is returned 
      return { session: session.id };

  //* in summary checkout 
    //* Creates a Stripe checkout session for processing the payment.
    //* Extracts the URL of the client request to provide success and cancel URLs.
    //* Creates a new order object with the products in the cart.
    //* Creates line items for each product to be included in the Stripe checkout session.
    //* The line items contain the necessary details for pricing and quantity.
    //* Creates a Stripe checkout session with the specified payment method types,
    //* line items, and success/cancel URLs.
    //* Returns the session ID of the created Stripe checkout session.
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
    //! this query takes in the client args and creates a user
    //! creates a auth token with the user info embedded (look at server auth.js)
    //! returns token and user together in a object, so token can be store on client side in localstorage or a cookie
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    addOrder: async (parent, { products }, context) => {

      //! to add a order to the user document, the we take in products from args and context
      //! context provides login check and user info through the token created. 
      //! new order is created taking in the products
      //! the user is found using context date and updated by pushing the new order document into user document, making the order its subdocument
      //! new order is returned to client
    
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },

    updateUser: async (parent, args, context) => {
        //! checks authentication, finds the user, takes args to update and returns the new user
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },

    updateProduct: async (parent, { _id, quantity }) => {
        //!taking in the product id and a quantity, 
        //! decrement value is established by using .abs(absolute value, making -1 = 1) on quantity making it positive then negative with '* -1', this makes sure its always negative
      const decrement = Math.abs(quantity) * -1;
        //! decrement is used to update the product with $inc: operator that adds decrement value to the product quantity, lowering it
      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },

    login: async (parent, { email, password }) => {
      //! find users by email
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
        //! uses User method to check hashed password against client provided password
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
        //! if all checks pass then user info is used to create token with user info embedded
      const token = signToken(user);

        //! client recieves token and user data back
      return { token, user };
    }
  }
};

module.exports = resolvers;
