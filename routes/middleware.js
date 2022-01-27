const Items = require("../models/Items");
const Users = require("../models/Users");
const Fridges = require("../models/Fridges");

// check if the given username exists
const usernameDoesNotAlreadyExist = (req, res, next) => {
  const username = req.body.username;
  if (Users.findOne(username) !== undefined){
    res.status(400).json({ 
      error: `User ${req.body.username} already exists. Please choose another username.`,
    }).end();
    return;
  }
  next();
};

// check if the username is above 1 char
const usernameIsValid = (req, res, next) => {
  if (req.body.username.length === 0) {
    res
      .status(400)
      .json({
        error: `The username must be at least 1 character.`,
      })
      .end();
    return;
  }
  next();
};

// check if the password is above 1 char
const passwordIsValid = (req, res, next) => {
  if (req.body.password.length === 0) {
    res
      .status(400)
      .json({
        error: `The password must be at least 1 character.`,
      })
      .end();
    return;
  }
  next();
};

// check if the password is the same as the old one
const passwordIsNew = (req, res, next) => {
  if (Users.findOneByID(req.session.userID).password === req.body.password) {
    res
      .status(400)
      .json({
        error: `The new password must be different from the old one.`,
      })
      .end();
    return;
  }
  next();
};

// check if the target username exists
const usernameExists = (req, res, next) => {
  if (Users.findOne(req.body.username) === undefined) {
    res
      .status(404)
      .json({
        error: `Username ${req.body.username} does not exist.`,
      })
      .end();
    return;
  }
  next();
};

// check if the target password matches
const passwordIsCorrect = (req, res, next) => {
  if (!Users.checkPassword(req.body.username, req.body.password)) {
    res
      .status(403)
      .json({
        error: `Incorrect password.`,
      })
      .end();
    return;
  }
  next();
};

// check if the user is not logged in
const userIsNotLoggedIn = (req, res, next) => {
  if (req.session.username !== undefined) {
    res
      .status(400)
      .json({
        error: `You are already signed in.`,
      })
      .end();
    return;
  }
  next();
};

// check if the user is logged in
const userIsLoggedIn = (req, res, next) => {
  if (req.session.userID === undefined) {
    res
      .status(403)
      .json({
        error: `You must be logged in first!`,
      })
      .end();
    return;
  }
  next();
};

// check if the author username is empty
const authorNameIsNotEmpty = (req, res, next) => {
  if (req.params.author === undefined) {
    res
      .status(400)
      .json({
        error: `You need to provide a username.`,
      })
      .end();
    return;
  }
  next();
};

// check if the author has been existed
const authorHasBeenExisted = (req, res, next) => {
  if (Users.findOne(req.params.username) === undefined) {
    res
      .status(404)
      .json({
        error: `Author ${req.params.username} does not exist.`,
      })
      .end();
    return;
  }
  next();
};

// check if the username is empty
const userNameIsNotEmpty = (req, res, next) => {
  if (req.params.username === undefined) {
    res
      .status(400)
      .json({
        error: `You need to provide a username.`,
      })
      .end();
    return;
  }
  next();
};

const profileNameIsNotEmpty = (req, res, next) => {
  if (req.params.userProfileOwner === undefined) {
    res
      .status(400)
      .json({
        error: `You need to provide a username.`,
      })
      .end();
    return;
  }
  next();
};

// check if the user exists
const userExists = (req, res, next) => {
  if (Users.findOne(req.params.username) === undefined) {
    res
      .status(404)
      .json({
        error: `User ${req.params.username} does not exist.`,
      })
      .end();
    return;
  }
  next();
};

const profileExists = (req, res, next) => {
  if (Users.findOne(req.params.userProfileOwner) === undefined) {
    res
      .status(404)
      .json({
        error: `User ${req.params.userProfileOwner} does not exist.`,
      })
      .end();
    return;
  }
  next();
};

// check if the user id is valid
const userIDIsValid = (req, res, next) => {
  const targetID = req.params.author;
  if (!Users.containsID(targetID)) {
    res
      .status(400)
      .json({
        error: `User ID is not valid.`,
      })
      .end();
    return;
  }
  next();
};

const checkItemPermission = (req, res, next) => {
  const creator = Items.findById(req.params.id).creatorID;
  const username = req.session.userID;
  console.log(creator)
  console.log(username)
  if (creator !== username) {
    res
      .status(401)
      .json({
        error: `item with id ${req.params.id} does not belong to you, you cannot make change to it.`,
      })
      .end();
    return;
  }
  next();
};

const checkFridgePermission = (req, res, next) => {
  const creator = Fridges.findById(req.params.id).creatorID;
  const username = req.session.username;
  if (creator !== username) {
    res
      .status(401)
      .json({
        error: `Fridge with id ${req.params.id} does not belong to you, you cannot make change to it.`,
      })
      .end();
    return;
  }
  next();
};

const checkFridgeHasUser = (req, res, next) => {
  const HasMember = Fridges.findMemberInFridge(req.params.id, req.body.newmember);
  if (HasMember.length !== 0) {
    res
      .status(401)
      .json({
        error: `Fridge has included this member already`,
      })
      .end();
    return;
  }
  next();
};

const memberExists = (req, res, next) => {
  if (Users.findOne(req.body.newmember) === undefined) {
    res
      .status(404)
      .json({
        error: `Username ${req.body.newmember} does not exist.`,
      })
      .end();
    return;
  }
  next();
};

const checkClaimedNumber = (req, res, next) => {
  if (req.body.quantity === 0) {
    res
      .status(401)
      .json({
        error: `Select a quantity!`,
      })
      .end();
    return;
  }
  next();
};

module.exports = Object.freeze({

  usernameDoesNotAlreadyExist,
  usernameIsValid,
  passwordIsValid,
  passwordIsNew,
  usernameExists,
  passwordIsCorrect,
  userIsNotLoggedIn,
  userIsLoggedIn,
  authorNameIsNotEmpty,
  authorHasBeenExisted,
  userNameIsNotEmpty,
  profileNameIsNotEmpty,
  userExists,
  profileExists,
  userIDIsValid,
  checkItemPermission,
  checkFridgePermission,
  checkFridgeHasUser,
  memberExists,
  checkClaimedNumber,
});
