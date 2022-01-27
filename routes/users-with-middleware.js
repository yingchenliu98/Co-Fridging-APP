const express = require('express');

const Users = require('../models/Users');
const validateThat = require('./middleware');

const router = express.Router();

/**
 * Create a user
 *
 * @name POST /api/user/
 *
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
    const user = Users.addOne(req.body.username, req.body.password);
    req.session.username = req.body.username;
    req.session.userID = user.userID;
    // hide password but show the length of it for user to double check
    res
      .status(200)
      .json(user)
      .end();
  }
);

/**
 * Sign in a user
 *
 * @name POST/ api/user/session/signin
 *
 * @param {string} username - username
 * @param {string} password - password
 * @return {201} - successfully updated user
 * @throws {403} - if the user is already logged in
 * @throws {400} - if username or password is not filled
 * @throws {404} - if the username is not found
 * @throws {401} - if the password does not match
 */
router.post(
  '/session/signin',
  [
    validateThat.usernameIsValid,
    validateThat.passwordIsValid,
    validateThat.usernameExists,
    validateThat.passwordIsCorrect,
  ],
  (req, res) => {
    const user = Users.findOne(req.body.username);
    req.session.username = req.body.username;
    req.session.password = req.body.password;
    req.session.userID = Users.findOne(req.body.username).userID;
    res
      .status(201)
      .json(user);
  }
);

/**
 * Sign out a user.
 *
 * @name DELETE /api/user/session
 *
 * @param {string} userID - userID in the session
 * @throws {401} - if the user is not logged in
 */
router.delete('/session', [validateThat.userIsLoggedIn], (req, res) => {
  req.session.username = undefined;
  req.session.userID = undefined;
  res.status(200).json({ message: 'You are signed out.' });
});

/**
 * Delete a user.
 *
 * @name DELETE /api/user/
 *
 * @param {string} userID - user ID in the session
 * @return {200} - successfully updated user
 * @throws {401} - if the user is not logged in
 */

router.delete('/', [validateThat.userIsLoggedIn], (req, res) => {
  const userID = req.session.userID;

  // // 1) revoke likes count for freets liked by the user
  // const likesList = Users.getUpvoteList(userID);
  // Freets.downVoteMany(likesList);

  // // 2) revoke refreet count for freets refreeted by the user
  // const refreetsList = Users.getRefreetList(userID);
  // Freets.unRefreetMany(userID, refreetsList);

  // // 3) delete user from following/followers
  // Users.deleteFollowStatusMany(userID);

  // // 4) delete user's freets(origin freets and related refreets)
  // Freets.deleteAuthorAll(userID);

  // 6) delete this user
  Users.deleteOne(req.session.userID);

  // 7) sign out
  req.session.username = undefined;
  req.session.userID = undefined;
  res.status(200).json({
    message: 'The account is deleted and you are automatically logged out.',
  });
});

/**
 * Change a user's name.
 *
 * @name PUT /api/user/username
 *
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
    const user = Users.updateUsernameOne(req.session.userID, req.body.username);

    // update previous freets' creator
    // ID stays the same so not necessary -> Freets.updateAuthorAll(req.session.username, req.body.username);
    // update the current session username
    req.session.username = req.body.username;

    res
      .status(200)
      .json({
        username: `${user.username}`,
        message: `The username of your account has been updated to ${user.username}.`,
      })
      .end();
  }
);

/**
 * Change a user's password.
 *
 * @name PUT /api/user/password
 *
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
    const user = Users.updatePasswordOne(req.session.userID, req.body.password);
    // hide password but show the length of it for user to double check
    res
      .status(200)
      .json({
        message: `The password of your account ${
          user.username
        } has been updated to ${'*'.repeat(user.password.length)}.`,
      })
      .end();
  }
);

/**
 * Change a user's profile information.
 *
 * @name PUT /api/user/profile
 *
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
    const user = Users.updateUserProfile(req.session.userID, req.body.username, req.body.name, req.body.location, req.body.bio);

    // update previous freets' creator
    // ID stays the same so not necessary -> Freets.updateAuthorAll(req.session.username, req.body.username);
    // update the current session username
    req.session.username = req.body.username;

    res
      .status(200)
      .json(user)
      .end();
  }
);

/**
 * Add friends.
 *
 * @name PUT /api/user/friend/:username?
 *
 * @param {string} sessionUser - the username in session
 * @param {string} userToAdd - the user to be added as friends
 * @return {200} - successfully updated user
 * @throws {401} - if the user is not logged in
 * @throws {400} - if username is not filled
 * @throws {409} - if the username is already taken
 */
 router.put(
  '/friend',
  (req, res) => {
    const users = Users.addFriends(req.body.sessionUsername, req.body.usernameToAdd);

    res
      .status(200)
      .json(users)
      .end();
  }
);

/**
 * Remove friends.
 *
 * @name PUT /api/user/friend/:username?
 *
 * @param {string} sessionUser - the username in session
 * @param {string} userToAdd - the user to be added as friends
 * @return {200} - successfully updated user
 * @throws {401} - if the user is not logged in
 * @throws {400} - if username is not filled
 * @throws {409} - if the username is already taken
 */
 router.put(
  '/unfriend',
  (req, res) => {
    const users = Users.removeFriends(req.body.sessionUsername, req.body.usernameToRemove);
    
    res
      .status(200)
      .json(users)
      .end();
  }
);


/**
 * Get a username in the session
 *
 * @name GET /api/user/session
 *
 * @throws {401} - if the user is not already logged in
 */
router.get('/session', [validateThat.userIsLoggedIn], (req, res) => {
  res.status(200).json({ username: req.session.username });
});

/**
 * Get a userID in the session
 *
 * @name GET /api/userID/session
 *
 * @throws {401} - if the user is not already logged in
 */
router.get('/session', [validateThat.userIsLoggedIn], (req, res) => {
  res.status(200).json({ userID: req.session.userID });
});

/**
 * Get a username with given userID
 *
 * @name GET /api/user/username/:userID?
 *
 * @throws {401} - if the user is not already logged in
 */
router.get(
  '/:userID?',
  // [validateThat.userIsLoggedIn, validateThat.userIDIsValid],
  (req, res) => {
    const username = Users.findUsernameByID(req.params.userID);
    res.status(200).json(username);
  }
);

/**
 * Get a entire user object with given username (USE THE ONE BELOW)
 *
 * @name GET /api/user/userID/:username?
 *
 * @throws {401} - if the user is not already logged in
 */
router.get(
  '/userID/:username?',
  [
    validateThat.userIsLoggedIn, 
    validateThat.userNameIsNotEmpty,
    validateThat.userExists,
  ],
  (req, res) => {
    const user = Users.findOne(req.params.username);
    res.status(200).json(user);
  }
);

/**
 * Get a entire user object with given username (USE THIS ONE)
 *
 * @name GET /api/user/profile/:userProfileOwner?
 *
 * @throws {401} - if the user is not already logged in
 */
 router.get(
  '/profile/:userProfileOwner?',
  [
    validateThat.profileNameIsNotEmpty,
    validateThat.profileExists,
  ],
  (req, res) => {
    const user = Users.findOne(req.params.userProfileOwner);
    res.status(200).json(user);
  }
);


/**
 * Get the user profile (entire object) in the session
 *
 * @name GET /api/user/session/profile
 *
 * @throws {401} - if the user is not already logged in
 */
 router.get('/session/profile', [validateThat.userIsLoggedIn], (req, res) => {
  const user = Users.findOneByID(req.session.userID);
  res.status(200).json(user);
});


// /**
//  * Toggle if the user follows someone
//  *
//  * @name PUT /api/user/following
//  *
//  * @param {string} userID - The ID of the user to update
//  * @param {string} otherID - The ID of the user to follow
//  * @return {200} - successfully updated user
//  * @throws {401} - if the user is not logged in
//  */
// router.put('/following', [validateThat.userIsLoggedIn], (req, res) => {
//   const user = Users.toggleFollow(req.session.userID, req.body.otherID);
//   res
//     .status(200)
//     .json(user)
//     .end();
// });

// /**
//  * Get user's following'
//  *
//  * @name GET /api/user/following
//  *
//  * @param {string} userID - The ID of the user
//  * @return {200} - successfully updated user
//  * @throws {401} - if the user is not logged in
//  */
// router.get('/following/:userID?', [validateThat.userIsLoggedIn], (req, res) => {
//   const following = Users.findOneFollowing(req.params.userID);
//   res
//     .status(200)
//     .json(following)
//     .end();
// });

// /**
//  * Get follow status of one user to another
//  *
//  * @name GET /api/user/followingStatus/:userID?
//  *
//  * @param {string} userID - The ID of the user
//  * @return {200} - successfully updated user
//  * @throws {401} - if the user is not logged in
//  */
// router.get(
//   '/followingStatus/:userID?',
//   [validateThat.userIsLoggedIn],
//   (req, res) => {
//     res
//       .status(200)
//       .json(Users.isFollowing(req.session.userID, req.params.userID))
//       .end();
//   }
// );

// /**
//  * Get user's followers'
//  *
//  * @name GET /api/user/followers
//  *
//  * @param {string} userID - The ID of the user
//  * @return {200} - successfully updated user
//  * @throws {401} - if the user is not logged in
//  */
// router.get('/followers/:userID?', [validateThat.userIsLoggedIn], (req, res) => {
//   const followers = Users.findOneFollowers(req.params.userID);
//   res
//     .status(200)
//     .json(followers)
//     .end();
// });


module.exports = router;
