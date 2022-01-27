const express = require("express");

const Fridges = require("../models/Fridges");
const validateThat = require("./middleware");

const router = express.Router();

/**
 * View Fridges by all
 *
 * @name GET /api/Fridges
 *
 * @return {freet[]} - list of all stored Fridges if author is not given, else list of stored Fridges with given author
 * */
router.get("/all", (req, res) => {
  res.status(200).json(Fridges.findAll()).end();
});

router.get("/getItems/:fridgeID?", (req, res) => {
  console.log(Fridges.findById(req.params.fridgeID))
  res.status(200).json(Fridges.findById(req.params.fridgeID)).end();
});

/**
 * View Fridges by one
 *
 * @name GET /api/Fridges/:author?
 * @param {string} authorID - author ID to filter by (query parameter, optional)
 *
 * @return {freet[]} - list of all stored Fridges if author is not given, else list of stored Fridges with given author
 * */
router.get("/:author?", (req, res) => {
  res.status(200).json(Fridges.findAuthorAll(req.params.author)).end();
});


/**
 * Create a fridge (must signed in first)
 *
 * @name POST /api/Fridges/
 *
 * @param {string} userID - authorID (req.session.userID)
 * @param {string} content - content of freet
 * @return {freet} - the posted freet
 * @throws {401} - if the user is not logged in
 * @throws {400} - if content is not filled
 * */
router.post("/", (req, res) => {
  const fridge = Fridges.addOne(req.body.fname, req.session.username);
  res.status(201).json(fridge).end();
  console.log(req.body);
});

/**
 * Edit a freet.
 *
 * @name PUT /api/Fridges/:id?
 *
 * @param {string} id - freetID (req.body.id)
 * @param {string} content - content of freet
 * @return {200} - freet has been updated
 * @throws {401} - if the user is not logged in
 * @throws {401} - if the freetID is not filled
 * @throws {404} - if the freetID is not found
 * @throws {400} - if content is not filled
 * @throws {401} - if content is not filled
 */
router.put(
  "/:id?",
  [
    validateThat.userIsLoggedIn,
  ],
  (req, res) => {
    // return the updated freet with new content
    res
      .status(200)
      .json(
        Fridges.updateOne(req.params.id, req.body.content, req.session.userID)
      )
      .end();
  }
);

/**
 * Add Member to Fridge.
 *
 * @name PUT /api/Fridges/:id?
 *
 * @param {string} id - freetID (req.body.id)
 * @param {string} content - content of freet
 * @return {200} - freet has been updated
 * @throws {401} - if the user is not logged in
 * @throws {401} - if the freetID is not filled
 * @throws {404} - if the freetID is not found
 * @throws {400} - if content is not filled
 * @throws {401} - if content is not filled
 */
 router.put(
  "/addMember/:id?",
  [
    // validateThat.userIsLoggedIn,
    validateThat.checkFridgeHasUser,
    validateThat.memberExists
  ],
  (req, res) => {
    // return the updated freet with new content
    res
      .status(200)
      .json(
        Fridges.addMember(req.params.id, req.body.newmember)
      )
      .end();
    console.log(req.body)
  }
);

/**
 * Delete a fridge (must login).
 *
 * @name DELETE /api/Fridges/:id?
 *
 * @param {string} id - freetID (req.query.id)
 * @return {200} - freet has been deleted
 * @throws {401} - if the user is not logged in
 * @throws {400} - if freetID is not filled
 * @throws {404} - if the freet is not found
 * @throws {401} - if the freet's authorID does not match the userID in the current session
 */
router.delete("/:id?", [validateThat.userIsLoggedIn], (req, res) => {
  // return the updated freet list created by the current account to show the success of deletion
  res.status(200).json(Fridges.deleteOne(req.params.id)).end();
});

/**
 * Delete a fridge member(must login).
 *
 * @name DELETE /api/Fridges/:id?
 *
 * @param {string} id - freetID (req.query.id)
 * @return {200} - freet has been deleted
 * @throws {401} - if the user is not logged in
 * @throws {400} - if freetID is not filled
 * @throws {404} - if the freet is not found
 * @throws {401} - if the freet's authorID does not match the userID in the current session
 */
 router.delete("/removeMember/:id?/:member?", [validateThat.userIsLoggedIn], (req, res) => {
  res.status(200).json(Fridges.deleteMember(req.params.id, req.params.member)).end();
});


module.exports = router;
