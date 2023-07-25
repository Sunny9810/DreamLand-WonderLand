const express = require("express");                            //* import express to create server
const { ApolloServer } = require("apollo-server-express");      //* import apolloServer to set up graphQL server
const path = require("path");                                   //* import path to help with filepaths
const { authMiddleware } = require("./utils/auth");             //* import authMiddleware from auth.js to handle authentication

const { typeDefs, resolvers } = require("./schemas");           //* resolvers and typedefs import to set up with graphQL server
const db = require("./config/connection");                      //* import db connection values

const PORT = process.env.PORT || 3001;                          //* define the PORT value
const app = express();                                          //* create instance of the express application
const server = new ApolloServer({                               //* create instance of the apolloserver,  
  typeDefs,                                                     //* passing in the typedefs, resolvers and context option set to authMiddleware 
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));               //* middleware to allow the express app to parse JSON and URL encoded payloads
app.use(express.json());


app.use("/images", express.static(path.join(__dirname, "../client/images")));   //* when a request is made to a file in "/images" it'll point it to "../client/images"

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));             //* if the node enviroment value is set to production it will tell the app where to find the optimized static files
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));             //* since we have a single page application when a request is made to the root url "/",
});                                                                               //* this html file is served, allowing the front end to handle all client side routing, due to our REACT structure 


app.get("/success", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


const startApolloServer = async () => {     //* function to start the apollo server 
  await server.start();                       //* before starting everything below will happen
  server.applyMiddleware({ app });              //* apollo server applies middleware to app

  db.once("open", () => {           //* connection to db is made by express, console logging port and graphQL endpoint
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};


startApolloServer();     //* start server is called

//! This server file sets up an Express server with Apollo Server integration,
//! serving static assets, and handling GraphQL requests based on the defined schemas and resolvers.
