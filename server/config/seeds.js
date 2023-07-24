const db = require("./connection"); //* mongoose db import
const { User, Product, Category } = require("../models"); //* importing models to create the data objects that will be inserted in the live db

db.once("open", async () => {
  //! db.once listens for the connection to the db to open and executes the embedded logic
  await Category.deleteMany();

  const categories = await Category.insertMany([
    {
      name: "Baby",
      size: ["NB", "0-3", "3-6", "6-9", "9-12", "12-18", "18-24"],
    },
    {
      name: "Kids",
      size: ["2-3", "4-5", "6-7", "8-9", "10", "12", "14"],
    },
    { name: "Grownups", 
    size: ["XS", "S", "M", "L", "XL", "XXL"] },

  console.log("categories seeded");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "Aurora",
      description: "Beautiful Aurora pattern based on Nature's wonders.",
      image: ["/Baby/1.png", "/patterns/19_1.jpg"],
      category: categories[0]._id,

      price: 10,
      quantity: 500,
    },
    {
      name: "Modern",
      description: "Modern forest pattern for dreamy sleep.",
      image: ["/Baby/2.png", "/patterns/21_1.jpg"],
      category: categories[0]._id,

      price: 10,
      quantity: 500,
    },
    {
      name: "Dots",
      description: "Dotted pattern for dreamy sleep. Bamboo...",
      image: ["/Baby/3.png", "/patterns/20_1.jpg"],
      category: categories[0]._id,

      price: 10,
      quantity: 500,
    },
    {
      name: "Stripes",
      description: "Stripes art design For dreamy person.",
      image: ["/Baby/4.png", "/patterns/22_1.jpg"],
      category: categories[0]._id,

      price: 10,
      quantity: 500,
    },
    {
      name: "Forest",
      description: "Forest vibes for nature buddies.",
      image: ["/Baby/5.png", "/patterns/27_1.jpg"],
      category: categories[0]._id,

      price: 10,
      quantity: 500,
    },
    {
      name: "Sunrise",
      description: "Sun rise patterns for positive vibes",
      image: ["/Baby/6.png", "/patterns/24_1.jpg"],
      category: categories[0]._id,

      price: 10,
      quantity: 500,
    },
    {
      name: "Moon and Stars",
      description: "Get settled in with a classic.",
      image: ["/Baby/7.png", "/patterns/25_1.jpg"],
      category: categories[0]._id,

      price: 10,
      quantity: 500,
    },
    {
      name: "Mashroom",
      description: "Join the forest creatures with these Mushroom Jammies.",
      image: ["/Baby/8.png", "/patterns/26_1.jpg"],
      category: categories[0]._id,

      price: 10,
      quantity: 500,
    },
    {
      name: "Geometric",
      description: "Geometic design style for cool sleepy.",
      image: ["/Baby/9.png", "/patterns/23_1.jpg"],
      category: categories[0]._id,

      price: 10,
      quantity: 500,
    },

    {
      name: "Aurora",
      description: "Beautiful Aurora pattern based on Nature's wonders.",
      image: ["/kids/11.png", "/patterns/19_1.jpg"],
      category: categories[1]._id,

      price: 10,
      quantity: 500,
    },
    {
      name: "Modern",
      description: "Modern forest pattern for dreamy sleep.",
      image: ["/Kids/10.png", "/patterns/21_1.jpg"],
      category: categories[1]._id,

      price: 10,
      quantity: 500,
    },
    {
      name: "Dots",
      description: "Dotted pattern for dreamy sleep. Bamboo...",
      image: ["/Kids/12.png", "/patterns/20_1.jpg"],
      category: categories[1]._id,

      price: 10,
      quantity: 500,
    },
    {
      name: "Stripes",
      description: "Stripes art design For dreamy person.",
      image: ["/Kids/13.png", "/patterns/22_1.jpg"],
      category: categories[1]._id,

      price: 10,
      quantity: 500,
    },
    {
      name: "Forest",
      description: "Forest vibes for nature buddies.",
      image: ["/Kids/15.png", "/patterns/27_1.jpg"],
      category: categories[1]._id,

      price: 10,
      quantity: 500,
    },
    {
      name: "Sunrise",
      description: "Sun rise patterns for positive vibes",
      image: ["/Kids/16.png", "/patterns/24_1.jpg"],
      category: categories[1]._id,

      price: 10,
      quantity: 500,
    },
    {
      name: "Moon and Stars",
      description: "Get settled in with a classic.",
      image: ["/Kids/17.png", "/patterns/25_1.jpg"],
      category: categories[1]._id,

      price: 10,
      quantity: 500,
    },
    {
      name: "Mashroom",
      description: "Join the forest creatures with these Mushroom Jammies.",
      image: ["/Kids/18.png", "/patterns/26_1.jpg"],
      category: categories[1]._id,

      price: 10,
      quantity: 500,
    },
    {
      name: "Geometric",
      description: "Geometic design style for cool sleepy.",
      image: ["/Kids/14.png", "/patterns/23_1.jpg"],
      category: categories[1]._id,

      price: 10,
      quantity: 500,
    },

    {
      name: "Aurora - Men",
      description: "Beautiful Aurora pattern based on Nature's wonders.",
      image: ["/Men/19.png", "/patterns/19_1.jpg"],
      category: categories[2]._id,
      price: 12,
      quantity: 500,
    },
    {
      name: "Dots - Men",
      category: categories[2]._id,
      description: "Dotted pattern for dreamy sleep. Bamboo...",
      image: ["/Men/20.png", "/patterns/20_1.jpg"],
      price: 25,
      quantity: 600,
    },
    {
      name: "Modern - Men",
      category: categories[2]._id,
      description: "Modern forest pattern for dreamy sleep.",
      image: ["/Men/21.png", "/patterns/21_1.jpg"],
      price: 25,
      quantity: 600,
    },
    {
      name: "Stripes - Men",
      category: categories[2]._id,
      description: "Stripes art design For dreamy person.",
      image: ["/Men/22.png", "/patterns/22_1.jpg"],
      price: 25,
      quantity: 600,
    },
    {
      name: "Geometric - Men",
      category: categories[2]._id,
      description: "Geometic design style for cool sleepy.",
      image: ["/Men/23.png", "/patterns/23_1.jpg"],
      price: 25,
      quantity: 600,
    },

    {
      name: "Sunrise - Men",
      category: categories[2]._id,
      description: "Sun rise patterns for positive vibes",
      image: ["/Men/24.png", "/patterns/24_1.jpg"],
      price: 25,
      quantity: 600,
    },

    {
      name: "Moon and Stars - Men",
      category: categories[2]._id,
      description: "Get settled in with a classic.",
      image: ["/Men/25.png", "/patterns/25_1.jpg"],
      price: 25,
      quantity: 600,
    },
    {
      name: "Mashroom - Men",
      category: categories[2]._id,
      description: "Join the forest creatures with these Mushroom Jammies.",
      image: ["/Men/26.png", "/patterns/26_1.jpg"],
      price: 25,
      quantity: 600,
    },
    {
      name: "Forest - Men",
      category: categories[2]._id,
      description: "Forest vibes for nature buddies.",
      image: ["/Men/27.png", "/patterns/27_1.jpg"],
      price: 25,
      quantity: 600,
    },

    {
      name: "Aurora - Women",
      description: "Beautiful Aurora pattern based on Nature's wonders.",
      image: ["/Women/28.png", "/patterns/19_1.jpg"],
      category: categories[2]._id,
      price: 12,
      quantity: 500,
    },
    {
      name: "Dots - Women",
      category: categories[2]._id,
      description: "Dotted pattern for dreamy sleep. Bamboo...",
      image: ["/Women/29.png", "/patterns/20_1.jpg"],
      price: 25,
      quantity: 600,
    },
    {
      name: "Modern - Women",
      category: categories[2]._id,
      description: "Modern forest pattern for dreamy sleep.",
      image: ["/Women/32.png", "/patterns/21_1.jpg"],
      price: 25,
      quantity: 600,
    },
    {
      name: "Stripes - Women",
      category: categories[2]._id,
      description: "Stripes art design For dreamy person.",
      image: ["/Women/33.png", "/patterns/22_1.jpg"],
      price: 25,
      quantity: 600,
    },
    {
      name: "Geometric - Women",
      category: categories[2]._id,
      description: "Geometic design style for cool sleepy.",
      image: ["/Women/36.png", "/patterns/23_1.jpg"],
      price: 25,
      quantity: 600,
    },

    {
      name: "Sunrise - Women",
      category: categories[2]._id,
      description: "Sun rise patterns for positive vibes",
      image: ["/Women/34.png", "/patterns/24_1.jpg"],
      price: 25,
      quantity: 600,
    },

    {
      name: "Moon and Stars - Women",
      category: categories[2]._id,
      description: "Get settled in with a classic.",
      image: ["/Women/30.png", "/patterns/25_1.jpg"],
      price: 25,
      quantity: 600,
    },
    {
      name: "Mashroom - Women",
      category: categories[2]._id,
      description: "Join the forest creatures with these Mushroom Jammies.",
      image: ["/Women/35.png", "/patterns/26_1.jpg"],
      price: 25,
      quantity: 600,
    },
    {
      name: "Forest - Women",
      category: categories[2]._id,
      description: "Forest vibes for nature buddies.",
      image: ["/Women/31.png", "/patterns/27_1.jpg"],
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
