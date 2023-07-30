const router = require("express").Router();
let UserModel = require("../models/usersModel");

router.route("/users").get((req, res) => {
  UserModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(401).json("Error: " + err));
});

router.route("/users").post((req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const username = req.body.username;

  const newUser = new UserModel({ name: name, age: age, username: username });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get a single user by userId
router.route("/users/:id").get(async (req, res) => {
  try {
    const post = await UserModel.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "User does not exist" });
  }
});

module.exports = router;
