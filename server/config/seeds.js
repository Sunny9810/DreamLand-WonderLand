const db = require("./connection");
const { User, Product, Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    {
      name: "Baby(0-24M)",
      size: ["NB", "0-3", "3-6", "6-9", "9-12", "12-18", "18-24"],
    },
    {
      name: "Kids(2-14Y)",
      size: ["2-3", "4-5", "6-7", "8-9", "10", "12", "14"],
    },
    { name: "Grownups(S-XXL)", size: ["XS", "S", "M", "L", "XL", "XXL"] },
  ]);

  console.log("categories seeded");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "Honey Bee PJ",
      description: "Honey Bee pj for Baby.",
      image: ["onesie.jpg", "pj.png", "pants.jpg"],
      category: categories[0]._id,
      price: 12,
      quantity: 500,
    },
    {
      name: "Funky Onesie",
      description: "Funky Onesie for Baby.",
      image: ["onesie.jpg", "pj.png", "pants.jpg"],
      category: categories[0]._id,
      price: 10,
      quantity: 500,
    },
    {
      name: "Kid-set",
      category: categories[1]._id,
      description: "Kids set.",
      image: ["onesie.jpg", "pj.png", "pants.jpg"],
      price: 20,
      quantity: 600,
    },
    {
      name: "Kid-onesie",
      category: categories[1]._id,
      description: "Kids onesie",
      image: ["onesie.jpg", "pj.png", "pants.jpg"],
      price: 20,
      quantity: 600,
    },
    {
      name: "White pants",
      category: categories[2]._id,
      description: "White pants",
      image: ["onesie.jpg", "pj.png", "pants.jpg"],
      price: 25,
      quantity: 600,
    },
    {
      name: "pants",
      category: categories[2]._id,
      description: "pants",
      image: ["onesie.jpg", "pj.png", "pants.jpg"],
      price: 25,
      quantity: 600,
    },
  ]);

  console.log("products seeded");

  await User.deleteMany();

  await User.create({
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id],
      },
    ],
  });

  await User.create({
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "password12345",
  });

  console.log("users seeded");

  process.exit();
});
