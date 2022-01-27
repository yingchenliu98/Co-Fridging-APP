const express = require("express");
const Fridges = require("../models/Fridges");

const Items = require("../models/Items");
const Users = require("../models/Users");
const validateThat = require("./middleware");

const router = express.Router();

/**
 * List all items
 * @name GET /api/item
 * @return {Items[]} -  list of items, as well as 200 status code for success

 * */
router.get("/all", (req, res) => {
  res.status(200).json(Items.findAll()).end();
});
/**
 * List all items by creator id
 * @name GET /api/item/:author?
 * @return {Items[]} -  list of items, as well as 200 status code for success and 400 for userID is not valid

 * */
router.get("/:author?", [validateThat.userIDIsValid], (req, res) => {
  console.log(req.params.fridge);
  res.status(200).json(Items.findByAuthor(req.params.author)).end();
});

// /**
//  * List all items by category
//  * @name GET /api/item/:category?
//  * @return {Items[]} -  list of items, as well as 200 status code for success and 400 for category is not valid

//  * */
// router.get("/:category?", [], (req, res) => {
//   res.status(200).json(Items.findByCategory(req.params.category)).end();
// });
/**
 * List all items by item ID
 * @name GET /api/item/:id?
 * @return {Items} -  an Item as well as 200 status code for success and 400 for category is not valid

 * */
router.get("/id/:id?", [], (req, res) => {
  console.log(Items.findById(req.params.id));
  res.status(200).json(Items.findById(req.params.id)).end();
});

/**
 * List all items by fridge name
 * @name GET /api/item/:fridge?
 * @return {Items[]} -  list of items, as well as 200 status code for success
 * */
router.get("/fridgeItems/:fridgeID?", [], (req, res) => {
  console.log(req.params.fridgeID);
  console.log('hahaha');
  res.status(200).json(Items.findByFridge(req.params.fridgeID)).end();
});
/**
 * Create an Item. You have to be a signed in user.
 * 
 * @name POST /api/item/create
 * @return {Item} - the created Item, as well as 200 status code for success, 403 for user not logged in 
 */
router.post("/create", [validateThat.userIsLoggedIn], (req, res) => {
  const item = Items.addOne(req.body.newItem, req.session.userID, req.session.username);
  Users.addItem(item.id, req.session.userID);
  Fridges.addItem(item.id, item.fridge)
  res.status(200).json(item).end();
});

/**
 * Delete an Item. You have to log in. You can only delete your own Item
 * @name DELETE /api/item/delete/:id
 * @return {Item} - the deleted item, as well as 200 status code for success, 403 for user not logged in, 401 for no permission
 */
router.delete(
  "/delete/:id?",
  [validateThat.userIsLoggedIn, 
    validateThat.checkItemPermission],
  (req, res) => {
    console.log(req.params.id);
    res.status(200).json(Items.deleteOne(req.params.id)).end();
  }
);
/**
 * Claim an Item. You have to log in
 * @name POST /api/item/claim/:id
 * @return {Item} - the claimed item, as well as 200 status code for success, 403 for user not logged in
 */
router.post("/claim/:id?", 
  [
    validateThat.userIsLoggedIn, 
    validateThat.checkClaimedNumber
  ], (req, res) => {
  const claimed_item = Items.claim(req.params.id, req.body.quantity, req.session.userID);
  Users.addClaimedItem(claimed_item, req.session.userID);
  console.log(claimed_item)
  res.status(200).json(claimed_item).end();
});

/**
 * Mark an Item as completed. You have to log in
 * @name PUT /api/item/complete/:orderID?
 * @return {Order} - the completed order, as well as 200 status code for success, 403 for user not logged in
 */

router.put("/complete/:orderID?", 
  [
    validateThat.userIsLoggedIn
  ], (req, res) => {
  res.status(200).json(Items.complete(req.params.orderID)).end();
});


module.exports = router;
