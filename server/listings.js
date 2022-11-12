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
    enum: ["snow", "water", "hiking", "camping", "cycling"],
    default: "snow",
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
    name: "Hex 5000 Snowboard",
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
    price: 5,
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
    name: "Two Person Sub40",
    price: 5,
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
    name: "Warm Snuggler",
    price: 5,
    productType: "camping",
    image: "/sleepingpad1.png",
    seller: {
      firstname: "Manny",
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
