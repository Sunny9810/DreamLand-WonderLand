
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};