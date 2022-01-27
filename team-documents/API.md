## index.js  

/* GET home page */

router.get('/', (req, res) => {
});

## fridges-with-middleware.js  
/**
 View Fridges by all
 
 * @name GET /api/Fridges
 
 * @return {fridges[]} - list of all stored Fridges if author is not given, else list of stored Fridges with given author
  */

 router.get("/all", (req, res) => {
});

/**
 Create a fridge (must signed in first)
 
 * @name POST /api/Fridges/
 
 * @param {string} userID - authorID (req.session.userID)
 * @param {string} name - fridge name
 * @return {freet} - the posted freet
  */

 router.post("/", (req, res) => {
});

 /**
 View Fridges by one
 
 * @name GET /api/Fridges/:author?
 * @param {string} authorID - author ID to filter by (query parameter, optional)
 
 * @return {fridge[]} - list of all stored Fridges if author is not given, else list of stored Fridges with given author
  */

 router.get("/:author?", (req, res) => {
});

 /**
 Edit a fridge.
 
 * @name PUT /api/Fridges/:id?
 
 * @param {string} id - freetID (req.body.id)
 * @param {string} name - name of fridge
 * @return {200} - freet has been updated
 */

 router.put(
  "/:id?",
  [ validateThat.userIsLoggedIn,
    validateThat.editListIsNotEmpty,
    validateThat.idIsValid,
    validateThat.contentIsValid,
  ],
  (req, res) => {
  });

 /**
 Delete a fridge (must login).
 
 * @name DELETE /api/Fridges/:id?
 
 * @param {string} id - fridgeID (req.query.id)
 * @return {200} - fridge has been deleted
 */

 router.delete("/:id?", [validateThat.userIsLoggedIn], (req, res) => {
});

## items-with-middleware.js  

/**
 List all items
 * @name GET /api/item
 * @return {Items[]} -  list of items, as well as 200 status code for success and 503 if item not found  
 */

router.get("/all", (req, res) => {
});

/**
 List all items by creator id
 * @name GET /api/item/:author?
 * @return {Items[]} -  list of items, as well as 200 status code for success and 400 for userID is not valid
 */

router.get("/:author?", [validateThat.userIDIsValid], (req, res) => {
});


/**
 List all items by fridgeID
 * @name GET /api/item/:fridge?
 * @return {Items[]} -  list of items, as well as 200 status code for success
 */

router.get("/:fridge?", [], (req, res) => {
});


/**
 Create an Item. You have to be a signed in user.
 * @name POST /api/item/create
 * @return {Item} - the created Item, as well as 200 status code for success, 403 for user not logged in 
 */

router.post("/create", [validateThat.userIsLoggedIn], (req, res) => {
});

/**
 Delete an Item. You have to log in. You can only delete your own Item
 * @name DELETE /api/item/delete/:id
 * @return {Item} - the deleted Item, as well as 200 status code for success, 403 for user not logged in, 401 for no permission
 */

router.delete(
  "/delete/:id?",
  [validateThat.userIsLoggedIn, 
    validateThat.checkItemPermission],
  (req, res) => {
  }
);

/**
 Claim an Item. You have to log in
 * @name POST /api/item/claim/:id
 * @return {Item} - the claimed item, as well as 200 status code for success, 403 for user not logged in
 */

router.post("/claim/:id?", [validateThat.userIsLoggedIn], (req, res) => {
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
});

## users-with-middleware.js  
/**
 * Create a user
 * @name POST /api/user/
 * @param {string} username - username
 * @param {string} password - password
 * @return {201} - successfully updated user
 * @throws {400} - if the user is already logged in
 * @throws {400} - if username or password is not filled
 * @throws {409} - if the username is already taken
 *  */

 router.post(
  '/',
  [
    validateThat.usernameDoesNotAlreadyExist,
    validateThat.usernameIsValid,
    validateThat.passwordIsValid,
  ],
  (req, res) => {
  }
);

/**
 * Sign in a user
 * @name POST/ api/user/session
 * @param {string} username - username
 * @param {string} password - password
 * @return {201} - successfully updated user
 * @throws {403} - if the user is already logged in
 * @throws {400} - if username or password is not filled
 * @throws {404} - if the username is not found
 * @throws {401} - if the password does not match
 */
router.post(
  }
);

/**
 * Sign out a user.
 * @name DELETE /api/user/session
 * @param {string} userID - userID in the session
 * @throws {401} - if the user is not logged in
 */
router.delete('/session', [validateThat.userIsLoggedIn], (req, res) => {
});

/**
 * Delete a user.
 * @name DELETE /api/user/
 * @param {string} userID - user ID in the session
 * @return {200} - successfully updated user
 * @throws {401} - if the user is not logged in
 */

router.delete('/', [validateThat.userIsLoggedIn], (req, res) => {
  });
});

/**
 * Change a user's name.
 * @name PUT /api/user/username
 * @param {string} userID - the ID of the old username to update
 * @param {string} currUsername - The new username to associate with the user
 * @return {200} - successfully updated user
 * @throws {401} - if the user is not logged in
 * @throws {400} - if username is not filled
 * @throws {409} - if the username is already taken
 */

router.put(
  '/username',
  [
    validateThat.userIsLoggedIn,
    validateThat.usernameDoesNotAlreadyExist,
    validateThat.usernameIsValid,
  ],
  (req, res) => {
  }
);

/**
 * Change a user's password.
 * @name PUT /api/user/password
 * @param {string} userID - The ID of the user to update
 * @param {string} password - password
 * @return {200} - successfully updated user
 * @throws {401} - if the user is not logged in
 * @throws {400} - if username is not filled
 * @throws {409} - if the username is already taken
 */

router.put(
  '/password',
  [
    validateThat.userIsLoggedIn,
    validateThat.passwordIsValid,
    validateThat.passwordIsNew,
  ],
  (req, res) => {
  }
);

/**
 * Change a user's profile information.
 * @name PUT /api/user/profile
 * @param {string} userID - the ID of the old username to update
 * @param {string} currUsername - The new username to associate with the user
 * @return {200} - successfully updated user
 * @throws {401} - if the user is not logged in
 * @throws {400} - if username is not filled
 * @throws {409} - if the username is already taken
 */

 router.put(
  '/profile',
  [
    validateThat.userIsLoggedIn,
    validateThat.usernameDoesNotAlreadyExist,
    validateThat.usernameIsValid,
  ],
  (req, res) => {
  }
);

/**
 * Get a username in the session
 * @name GET /api/user/session
 * @throws {401} - if the user is not already logged in
 */
router.get('/session', [validateThat.userIsLoggedIn], (req, res) => {
});

/**
 * Get a userID in the session
 * @name GET /api/userID/session
 * @throws {401} - if the user is not already logged in
 */
router.get('/session', [validateThat.userIsLoggedIn], (req, res) => {
});

/**
 * Get a username with given userID
 * @name GET /api/user/username/:userID?
 * @throws {401} - if the user is not already logged in
 */
router.get(
  '/:userID?',
  // [validateThat.userIsLoggedIn, validateThat.userIDIsValid],
  (req, res) => {
  }
);

/**
 * Get an ID with given username
 * @name GET /api/user/userID/:username?
 * @throws {401} - if the user is not already logged in
 */
router.get(
  '/userID/:username?',
  [validateThat.userIsLoggedIn, validateThat.authorHasBeenExisted],
  (req, res) => {
  }
);

/**
 * Get the user profile (entire object) in the session
 * @name GET /api/user/session/profile
 * @throws {401} - if the user is not already logged in
 */
 router.get('/session/profile', [validateThat.userIsLoggedIn], (req, res) => {
});