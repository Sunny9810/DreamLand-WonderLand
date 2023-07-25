import { gql } from '@apollo/client';

  //! 'mutation login' function takes in $email and $password values from front end
  //! passes them to login server mutation requirements by the '$'
  //! and finally recieves a response object with the token and user
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

  //! the mutation to add a user is defined, structure is as follows
  //! 'mutation addUser' function takes in the front end variables
  //! followed by the server side 'addUser' execution that will take in the required variables above it signified by the '$'
  //! and finally the addUser mutation result object which is the 'token' and 'user'
  //! This mutation ultimatly lets client send a request to the server and retrieve the token and user data upon successful user creation.
export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;
