const mongoose = require("mongoose");
const User = require("./models/User");

const userArr = [
  {
    username: "sam2",
    password: "password",
  },
  {
    username: "sam1",
    password: "password",
  },
  {
    username: "sam3",
    password: "password",
  },
  {
    username: "sam4",
    password: "password",
  },
  {
    username: "sam5",
    password: "password",
  },
];

mongoose
  .connect("mongodb://localhost/FinalProjectDB", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

User.create(userArr)
  .then((results) => {
    console.log("Success", results);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("Something went wrong", err);
  });
