var express = require("express");
var router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
const Collection = require("../models/Collections");

require("dotenv").config();

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const jwt = require("jsonwebtoken");
const { useColors } = require("debug/src/browser");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource, you are on users");
});

router.get("/all-users", function (req, res) {
  User.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    });
});

router.post("/sign-up", function (req, res, next) {
  console.log("BODY", req.body);
  const { username, password } = req.body;
  console.log(username, "user");
  if (!username || !password) {
    res.json({ error: "Username and password are required" });
  }

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const userToCreate = new User({
    username: username,
    password: hashedPassword,
  });
  User.create(userToCreate)
    .then((newlyCreatedUser) => {
      console.log(newlyCreatedUser.id);
      console.log(newlyCreatedUser._id);

      const payload = {
        user: {
          id: newlyCreatedUser.id,
        },
      };

      jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: 4000000 },
        (err, token) => {
          if (err) {
            throw err;
          } else {
            res.json({ token, id: newlyCreatedUser.id, success: true });
          }
        }
      );
    })
    .catch((err) => {
      console.log("ERROR: ", err);
      res.json(err);
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.json({ error: "Username and password are required " });
  }
  User.findOne({ username: username })
    .then((foundUser) => {
      console.log("Founduser", foundUser.password);
      if (!foundUser) {
        res.json({ message: "username not found" });
      }
      const passMatch = bcrypt.compareSync(password, foundUser.password);
      if (!passMatch) {
        res.json({ message: "Improper Password" });
      }

      const payload = {
        user: {
          id: foundUser.id,
        },
      };

      jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: 4000000 },
        (err, token) => {
          if (err) {
            throw err;
          } else {
            res.json({ token, id: foundUser.id, success: true });
          }
        }
      );
    })
    .catch((err) => {
      res.json(foundUser);
    });
});
router.post("/delete-link", auth, function (req, res, next) {
  const { link, collectionID } = req.body;
  if (!collectionID || !link) {
    res.json({
      error: "Must be linked to a collection and link",
    });
  }
  Collection.findByIdAndUpdate(collectionID, {
    $pull: { links: link },
  })
    .then((results) => {
      console.log("This is delete-link results", results);
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.post("/delete", auth, function (req, res, next) {
  const { collectionID } = req.body;
  if (!collectionID) {
    res.json({
      error: "Must be linked to a collection",
    });
  }
  Collection.findByIdAndDelete(collectionID)
    .then((results) => {
      console.log("This is delete results", results);
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/add-link", auth, function (req, res, next) {
  const { link, collectionID } = req.body;
  if (!link || !collectionID) {
    res.json({
      error: "Must add links and/or be linked to a collection",
    });
  }
  Collection.findByIdAndUpdate(collectionID, {
    $push: { links: link },
  })
    .then((results) => {
      console.log("This is addlink results", results);
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.post("/create-collection", auth, function (req, res, next) {
  console.log("BODY", req.body);
  const { creator, links, title } = req.body;
  console.log(creator, "linkedUser");
  if (!creator || !links || !title) {
    res.json({
      error: "Account must be linked. Title and link(s) are required.",
    });
  }

  const collectionToCreate = new Collection({
    creator: creator,
    title: title,
    links: links,
  });
  Collection.create(collectionToCreate)
    .then((newlyCreatedCollection) => {
      User.findByIdAndUpdate(creator, {
        $push: { collections: newlyCreatedCollection._id },
      }).then((results) => {
        console.log("This is findbyID results", results);
        res.json(results);
      });
    })
    .catch((err) => {
      console.log("ERROR: ", err);
      res.json(err);
    });
});

router.post("/find-collection", function (req, res, next) {
  console.log("This is find collection", req.body);
  const { userID } = req.body;
  console.log("this is userID", userID);
  console.log("req.body.userID", req.body.userID);
  if (!userID) {
    res.json({
      error: "No collections or user not logged in",
    });
  }
  Collection.find({ creator: userID })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
});

module.exports = router;
