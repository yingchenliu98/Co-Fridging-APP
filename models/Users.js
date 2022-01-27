let userData = [
  // {
  //   username: '123',
  //   password: '123',
  //   userID: '23423424223',
  //   name: '',
  //   friends: [],
  //   createdFridges: [],
  //   joinedFridges: [],
  //   items: [],
  //   claimedItems: 
  //   [
  //     {
  //       name: 'Tomato',
  //       quantity: '2',
  //       start: '8:30AM',
  //       end: '9:00AM',
  //       id: 'dgdfgdfgdfg',
  //       status: '2',
  //       creatorID: '23423424223',
  //     },
  //     {
  //       name: 'Peach',
  //       quantity: '2',
  //       start: '8:30AM',
  //       end: '9:00AM',
  //       id: 'werwerwerwer',
  //       status: '2',
  //       creatorID: '23423424223',
  //     },
  //     {
  //       name: 'Potato',
  //       quantity: '3',
  //       start: '8:30AM',
  //       end: '9:00AM',
  //       id: 'fhgfghfghfg',
  //       status: '3',
  //       creatorID: '23423424223',
  //     },
  //     {
  //       name: 'Banana',
  //       quantity: '3',
  //       start: '8:30AM',
  //       end: '9:00AM',
  //       id: 'sfsfdsdf',
  //       status: '3',
  //       creatorID: '23423424223',
  //     },
  //   ],
  //   dates: [],
  //   points: 0,
  //   location: "",
  //   bio: "",
  // },
];

// Need ability to generate random IDs (primary/foreign keys)
const uuid = require("uuid");

/**
 * @typedef User
 * @prop {string} username - username
 * @prop {string} password - password
 * @prop {string} userID - userid
 * @prop {Array} friends - set of usernames that this user befriended
 * @prop {Set} createdFridges - set of fridges that this user created
 * @prop {Set} joinedFridges - set of fridges that this user joined
 * @prop {Set} items - set of items that this user gave and get
 * @prop {Array} dates - set of dates that this user used the app
 * @prop {int} points - karma points
 * @prop {object} location - user location
 * @prop {string} bio - user bio
 */

class Users {
  /* -------------------------------------------------------------------------- */
  /*                                  USER INFO                                 */
  /* -------------------------------------------------------------------------- */

  /**
   * Add a user to users list.
   *
   * @prop {string} username - username
   * @prop {string} password - password
   * @prop {string} userID - userid
   * @prop {Array} friends - set of usernames that this user befriended
   * @prop {Set} createdFridges - set of fridges that this user created
   * @prop {Set} joinedFridges - set of fridges that this user joined
   * @prop {Set} items - set of items that this user gave and get
   * @prop {Array} dates - set of dates that this user used the app
   * @prop {int} points - karma points
   * @prop {object} location - user location
   * @prop {string} bio - user bio
   *
   * @return {User \ undefined} - the newly created user
   */
  static addOne(username, password) {
    const userID = uuid.v4();

    const name = "";
    const friends = [];
    const createdFridges = [];
    const joinedFridges = [];
    const items = [];
    const claimedItems = [];
    const dates = [];
    const points = 0;
    const location = "";
    const bio = "";

    const timeElapsed = Date.now();
    const joinedDate = new Date(timeElapsed);
    const joinedYear = joinedDate.getFullYear();
    const joinedMonth = joinedDate.toLocaleString("en-US", { month: "long" });
    dates.push(joinedMonth);
    dates.push(joinedYear);

    const user = {
      username,
      password,
      userID,
      name,
      friends,
      createdFridges,
      joinedFridges,
      items,
      claimedItems,
      dates,
      points,
      location,
      bio,
    };
    userData.push(user);
    return user;
  }

  /**
   * Update a user's name.
   *
   * @param {string} userID - the ID of the user to update
   * @param {string} newUsername - The new username to associate with the user
   * @return {User | undefined} - The updated user
   */
  static updateUsernameOne(userID, newUsername) {
    const user = Users.findOneByID(userID);
    user.username = newUsername;
    return user;
  }

  /**
   * Update a user's password.
   *
   * @param {string} userID - The ID of the user to update
   * @param {string} newPassword - The new password to associate with the user
   * @return {User | undefined} - The updated user
   */
  static updatePasswordOne(userID, newPassword) {
    const user = Users.findOneByID(userID);
    user.password = newPassword;
    return user;
  }

  /**
   * Update a user's profile.
   *
   * @param {string} userID - the ID of the user to update
   * @param {string} newUsername - The new username to associate with the user
   * @return {User | undefined} - The updated user
   */
  static updateUserProfile(userID, newUsername, newName, newLocation, newBio) {
    const user = Users.findOneByID(userID);
    user.username = newUsername;
    user.name = newName;
    user.location = newLocation;
    user.bio = newBio;
    return user;
  }

  /**
   * Delete a user from the collection.
   *
   * @param {string} userID - ID of User to delete
   * @return {User | undefined} - deleted User
   */
  static deleteOne(userID) {
    const user = Users.findOneByID(userID);
    userData = userData.filter((u) => u.userID !== userID);
    return user;
  }

  /* --------------------------------- FRIENDS -------------------------------- */
  /**
   * Adding Friends.
   * 
   * @param {string} sessionUsername - The name of the user in session
   * @param {string} usernameToAdd - The name of the user to add
   * @return {Users | undefined} - the found users with above name
   */
   static addFriends(sessionUsername, usernameToAdd) {
    const sessionUser = Users.findOne(sessionUsername);
    const userToAdd = Users.findOne(usernameToAdd);
    const users = [];

    sessionUser.friends.push({username: userToAdd.username});
    userToAdd.friends.push({username: sessionUser.username});

    users.push(sessionUser);
    users.push(userToAdd);

    return users;
  }

  /**
   * Removing Friends.
   * 
   * @param {string} sessionUsername - The name of the user in session
   * @param {string} usernameToAdd - The name of the user to add
   * @return {Users | undefined} - the found users with above name
   */
   static removeFriends(sessionUsername, usernameToRemove) {
    const sessionUser = Users.findOne(sessionUsername);
    const userToRemove = Users.findOne(usernameToRemove);
    const users = [];

    sessionUser.friends = sessionUser.friends.filter((friend) => friend.username !== usernameToRemove);
    userToRemove.friends = userToRemove.friends.filter((friend) => friend.username !== sessionUsername);

    users.push(sessionUser);
    users.push(userToRemove);

    return users;
  }


  /* --------------------------------- GETTERS -------------------------------- */
 /**
   * Find a user by name.
   *
   * @param {string} username - The name of the user to find
   * @return {User | undefined} - the found user with above name
   */
  static findOne(username) {
    return userData.filter((user) => user.username === username)[0];
  }

  /**
   * Find a user by ID.
   *
   * @param {string} userID - The ID of the user to find
   * @return {User | undefined} - the found user with above name
   */
  static findOneByID(userID) {
    return userData.filter((user) => user.userID === userID)[0];
  }

  /**
   * Find a username based on given userID
   *
   * @param {string} userID - the ID of the user to update
   * @return {username | undefined} - username
   */
  static findUsernameByID(userID) {
    const user = Users.findOneByID(userID);
    return user.username;
  }

  /**
   * Find a userID based on given username
   *
   * @param {string} username - the username of the user
   * @return {userID | undefined} - username
   */
  static findIDByUsername(username) {
    const user = Users.findOne(username);
    return user.userID;
  }

  /**
   * Check if username matches password
   *
   * @param {string} username - username
   * @param {string} password - password
   * @return {True | False} - boolean result
   */
  static checkPassword(username, password) {
    return Users.findOne(username).password === password;
  }

  /**
   * Checks if any user in the users collections has the given User ID
   *
   * @prop {string} userID - User ID
   * @return {Boolean} - true if some user with the id exists
   */
  static containsID(userID) {
    return userData.filter((user) => user.userID === userID).length > 0;
  }


  /* --------------------------------- GETTERS -------------------------------- */



  
  /* --------------------------------- CLAIM ITEMS -------------------------------- */
  
  /**
   * Add an item to a user's items list
   * @param {string} itemID - username
   * @param {string} userID - user ID
   * @return {User} user
   */
  static addItem(itemID, userID) {
    const user = Users.findOneByID(userID);
    user.items.push(itemID);
    console.log(user)
    return user;
  }

  /**
   * Add a claimed item to a user's claimed items list
   * @param {object} claimed_item - claimed item
   * @param {string} userID - user ID
   * @return {User} user
   */
  static addClaimedItem(claimed_item, userID) {
    const user = Users.findOneByID(userID);
    user.claimedItems.push(claimed_item);
    return user;
  }
    /**
   * Delete an item to a user's  items list
   * @param {string} itemID -item ID
   * @param {string} userID - user ID
   * @return {User} user
   */
  static deleteItem(itemID, userID) {
    const user = Users.findOneByID(userID);
    let index = user.items.indexOf(itemID);
    if (index > -1){
      user.items.splice(index, 1);
    }
    return user;
  }
  // static cancelClaimedItem(itemID, userID) {
  //   const user = Users.findOneByID(userID);
  //   let index = user.claimedItems.indexOf(itemID);
  //   if (index > -1){
  //     user.claimedItems.splice(index, 1);
  //   }
  //   return user;
  // }
  /**
   * Add a fridge ID  to a user's fridges list
   * @param {string} fridgeID -fridge ID
   * @param {string} userID - user ID
   * @return {User} user
   */
  static addCreatedFridge(fridgeID, userID){
    const user = Users.findOneByID(userID);
    user.createdFridges.push(fridgeID);
    return user;
  }
  /**
   * Add a fridge ID  to a user's joined fridges list
   * @param {string} fridgeID -fridge ID
   * @param {string} userID - user ID
   * @return {User} user
   */
  static addJoinedFridge(fridgeID, userID){
    const user = Users.findOneByID(userID);
    user.joinedFridges.push(fridgeID);
    return user;
  }

}

module.exports = Users;
