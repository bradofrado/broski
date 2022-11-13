const express = require("express");
const mongoose = require("mongoose");

const uploader = require("./uploader.js");
const Location = require("./locations.js").model;
const Seller = require("./users.js").model;
//const ProductType = require('./productTypes.js').model;

const path = "/images/listings";

const validUser = require("./users.js").valid;

const upload = uploader.upload(path).single("image");

const router = express.Router();

const listingSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  location: {
    type: mongoose.Schema.ObjectId,
    ref: "Location",
  },
  // productType: {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'ProductType'
  // },
  productType: {
    type: String,
    enum: ["snow", "water", "hiking", "camping", "biking", "climbing"],
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

listingSchema.methods.populate = async function () {
  const populate = async (type, model) => {
    if (mongoose.isValidObjectId(this[type])) {
      const item = await model.findOne({
        _id: this[type],
      });

      if (item && !item.isDeleted) {
        this[type] = item;
      } else {
        this[type] = null;
      }
    }
  };

  await populate("location", Location);
  //await populate('productType', ProductType);
  await populate("seller", Seller);
};

listingSchema.pre(/^find/, function () {
  this.where({ isDeleted: false });
});

listingSchema.post(/^find/, async function (docs, next) {
  let items = docs;
  const isArray = Array.isArray(docs);
  if (!isArray) {
    items = [docs];
  }

  for (let i = items.length - 1; i >= 0; i--) {
    let item = items[i];
    if (item && item.populate) {
      item && (await item.populate());
    }
  }

  if (!isArray && items.length == 0) {
    docs = null;
  }

  next();
});

const Listing = mongoose.model("Listing", listingSchema);

/* Endpoints */

const listings = [
  {
    name: "Redwind Skis",
    price: 125,
    productType: "snow",
    image: "/skis.jpg",
    seller: {
      firstname: "Trevor",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Hex Snowboard",
    price: 80,
    productType: "snow",
    image: "/snowboard1.png",
    seller: {
      firstname: "Todd",
    },
    location: {
      city: "Orem",
      state: "Utah",
    },
  },
  {
    name: "Size 9 Ski Boots",
    price: 35,
    productType: "snow",
    image: "/skiboots1.png",
    seller: {
      firstname: "Halle",
    },
    location: {
      city: "Springfield",
      state: "Utah",
    },
  },
  {
    name: "Burton Snowboard",
    price: 75,
    productType: "snow",
    image: "/snowboard2.png",
    seller: {
      firstname: "Braydon",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Bouncy Boots",
    price: 305,
    productType: "snow",
    image: "/skiboots2.png",
    seller: {
      firstname: "Ashley",
    },
    location: {
      city: "Syracuse",
      state: "Utah",
    },
  },
  {
    name: "Hot Girl Summer Jacket",
    price: 75,
    productType: "snow",
    image: "/skijacket1.png",
    seller: {
      firstname: "Hannah",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "The Mount Everest Gliders",
    price: 205,
    productType: "snow",
    image: "/snowshoes1.png",
    seller: {
      firstname: "Tanner",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Patagonia Womens Jacket",
    price: 5,
    productType: "snow",
    image: "/skijacket2.jpg",
    seller: {
      firstname: "Rebecca",
    },
    location: {
      city: "Orem",
      state: "Utah",
    },
  },
  {
    name: "Columbia PeakForm (4man)",
    price: 5,
    productType: "camping",
    image: "/tent1.png",
    seller: {
      firstname: "Braydon",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Fat Mans Cavern",
    price: 35,
    productType: "camping",
    image: "/tent2.png",
    seller: {
      firstname: "Henry",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Outdoor Rec (8 Man)",
    price: 105,
    productType: "camping",
    image: "/tent3.png",
    seller: {
      firstname: "Bill",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Warm Snuggler",
    price: 85,
    productType: "camping",
    image: "/sleepingbag1.png",
    seller: {
      firstname: "Manny",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Two Person Sub-15",
    price: 65,
    productType: "camping",
    image: "/sleepingbag2.png",
    seller: {
      firstname: "Henrietta",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Sleeping Pad Patagonia",
    price: 95,
    productType: "camping",
    image: "/sleepingpad.png",
    seller: {
      firstname: "Jenny",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Sleeping Pad Columbia",
    price: 25,
    productType: "camping",
    image: "/sleepingpad2.png",
    seller: {
      firstname: "Taylor",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Hiking Backpack",
    price: 85,
    productType: "camping",
    image: "/hikingpack.png",
    seller: {
      firstname: "Fernal",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Cooler",
    price: 5,
    productType: "camping",
    image: "/cooler.png",
    seller: {
      firstname: "Trent",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Cool Paddleboard",
    price: 35,
    productType: "water",
    image: "/paddleboard2.png",
    seller: {
      firstname: "Ben",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Kayak for Two",
    price: 65,
    productType: "water",
    image: "/kayak1.png",
    seller: {
      firstname: "Herald",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Life Jacket",
    price: 15,
    productType: "water",
    image: "/lifejacket.png",
    seller: {
      firstname: "TJ",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Wakesurfing Board",
    price: 305,
    productType: "water",
    image: "/wakesurf.png",
    seller: {
      firstname: "TJ",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Surf Board",
    price: 25,
    productType: "water",
    image: "/surfboard.png",
    seller: {
      firstname: "Jacob",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Wakesurfing Board",
    price: 25,
    productType: "water",
    image: "/wakesurf2.png",
    seller: {
      firstname: "TJ",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Wetsuit",
    price: 25,
    productType: "water",
    image: "/wetsuit.png",
    seller: {
      firstname: "Belle",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Anchor System",
    price: 35,
    productType: "climbing",
    image: "/anchorsystem.png",
    seller: {
      firstname: "Beatrice",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Climbing Shoes",
    price: 35,
    productType: "climbing",
    image: "/climbingshoes.png",
    seller: {
      firstname: "Adam",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Mens Climbing Shoes",
    price: 15,
    productType: "climbing",
    image: "/climbingshoes2.png",
    seller: {
      firstname: "John",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Climbing Training",
    price: 5,
    productType: "climbing",
    image: "/climbingtraining.png",
    seller: {
      firstname: "Beaver",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Scwhin Model 5",
    price: 35,
    productType: "biking",
    image: "/bike1.png",
    seller: {
      firstname: "Sarah",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Fezzari Model Y",
    price: 35,
    productType: "biking",
    image: "/bike2.png",
    seller: {
      firstname: "Jared",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "Car Bike Rack",
    price: 105,
    productType: "biking",
    image: "/bikerack.png",
    seller: {
      firstname: "Carol",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
  {
    name: "26'' Tire",
    price: 105,
    productType: "biking",
    image: "/biketire.png",
    seller: {
      firstname: "Fred",
    },
    location: {
      city: "Provo",
      state: "Utah",
    },
  },
];
router.get("/", async (req, res) => {
  try {
    //const listings = await Listing.find();

    res.send(listings);
  } catch (ex) {
    console.log(ex);
    res.sendStatus(500);
  }
});

router.get("/{id}", async (req, res) => {
  try {
    const listing = await Listing.findOne({ _id: req.params.id });
    if (!listing) {
      console.log("Could not find listing " + req.params.id);
      return res.status(400).send({
        message: "Could not find listing " + req.params.id,
      });
    }

    res.send(listing);
  } catch (ex) {
    console.log(ex);
    res.sendStatus(500);
  }
});

router.post("/", upload, async (req, res) => {
  try {
    if (!req.body.name || !req.body.price || !req.body.location || !req.body.productType) {
      console.log("Invalid body parameters");
      return res.status(400).send({
        message: "Invalid body parameters",
      });
    }

    const listing = new Listing({
      name: req.body.name,
      image: req.file ? path + "/" + req.file.filename : "",
      price: req.body.price,
      location: req.body.location,
      productType: req.body.productType,
      seller: req.user,
    });

    await listing.save();

    res.send(listing);
  } catch (ex) {
    console.log(ex);
    res.sendStatus(500);
  }
});

router.put("/:id", validUser, upload, async (req, res) => {
  try {
    if (!req.body.name || !req.body.price || !req.body.location || !req.body.productType) {
      console.log("Invalid body parameters");
      return res.status(400).send({
        message: "Invalid body parameters",
      });
    }

    const listing = await Listing.findOne({
      _id: req.params.id,
    });

    if (!listing) {
      console.log("Cannot find listing with id " + req.params.id);
      return res.status(400).send({
        message: "Cannot find listing with id " + req.params.id,
      });
    }

    const oldImage = listing.image;

    (listing.image = req.file ? path + "/" + req.file.filename : listing.image), (listing.name = req.body.name);
    listing.price = req.body.price;
    listing.productType = req.body.productType;
    listing.location = req.body.location;
    listing.seller = req.user;

    if (listing.image != oldImage) {
      uploader.delete(oldImage);
    }

    await listing.save();

    res.send(listing);
  } catch (ex) {
    console.log(ex);
    res.sendStatus(500);
  }
});

router.delete("/:id", validUser, async (req, res) => {
  try {
    const listing = await Listing.findOne({
      _id: req.params.id,
    });

    if (!listing) {
      console.log("Cannot find listing with id " + req.params.id);
      return res.status(400).send({
        message: "Cannot find listing with id " + req.params.id,
      });
    }

    listing.isDelete = true;
    await listing.save();

    res.send(listing);
  } catch (ex) {
    console.log(ex);
    res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
  model: Listing,
};
