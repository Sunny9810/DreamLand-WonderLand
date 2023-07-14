const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Baby' },
    { name: 'Kids' },
    { name: 'Grown-Ups' }
   
  ]);
});