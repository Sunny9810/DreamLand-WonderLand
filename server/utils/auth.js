const jwt = require('jsonwebtoken');
//! this file is bioler plate but i included comments for understanding of server "context" use
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    //! token is in ".authorization" in "Bearer <token>" form
    //! if req.headers.authorization exists
    //! we .split making it a array ["Bearer", "token value"]
    //! then .pop giving us the last element value which is the token string 
    //! then we .trim to remove spaces and assign the string to token variable
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    //! if no token in req then the req is returned
    if (!token) {
      return req;
    }
    //! if token, it is extracted and verified,
    //! it takes in the token, the secret passcode which needs to match, and the experation option
    //! if valid it gives payload which we deconstructed to data, data is assigned to req.user
    //! and finally we return the req
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ firstName, email, _id }) {
    //! user object is taken in and deconstructed to the 3 args above, turned into payload
    //! and inserted into token with jwt and returned
    const payload = { firstName, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
