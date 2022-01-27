let itemsData = [];
let ordersData = [];
// Need ability to generate random IDs (primary/foreign keys)
const uuid = require("uuid");
const Users = require("../models/Users");
// const Fridges = require("../models/Fridges");
/**
 * @typedef Items
 *
 * @prop {string} name - item type
 * @prop {number} quantity - item quantity
 * @prop {string} imageUrl - url to item image
 * @prop {string} description - item description
 * @prop {string} category - item category
 * @prop {string} fridge - the id of fridge the item belonged to
 * @prop {string} utility - utility type(free 0/swap 1)
 * @prop {string} expiryDate - expiration date
 * @prop {number} levelMaturity - level of Maturity
 * @prop {string} date - pickup date
 * @prop {string} start - start of time window
 * @prop {string} end - end of time window
 * @prop {string} swap - things want to swap with
 * @prop {string} specialInstructions - specialInstructions
 * @prop {string} id - item id
 * @prop {number} status - item status:posted 0, claimed 1, confirmed 2, finished 3, cancelled 4
 * @prop {Users} creatorID - creator of the item
 * @prop {string} pickupwindow - pickupwindow
 * @prop {Array claimerID - list of claimers of an item
 * @prop {Array} claimsReceived - received claims of an item
 */

class Items {
  /**
   * Add a new item to collection
   *
   * @param {string} newItem - A json input from the user side
   * @param {string} userID - The creator ID of the item.
   * @return {Item} - the newly created item
   */
  static addOne(newItem, userID, userName) {
    const id = uuid.v4();
    const item = newItem;
    item["id"] = id;
    item["status"] = 0; //posted 0, claimed 1, confirmed 2, finished 3, cancelled 4
    item["creatorID"] = userID;
    item["creatorName"] = userName;
    item["quantity"] = parseInt(item.quantity);
    item["pickupwindow"] = item.date + " " + item.start + "-" + item.end;
    item["claimerID"] = [];
    item["claimsReceived"] = [];
    if (item.utility === "0") {
      item.utility = "Free";
    } else {
      item.utility = "Swap";
    }
    itemsData.push(item);
    console.log(itemsData);

    return item;
  }

  /**
   * Find all existing Items
   *
   * @return {Items[]} an array of all of the items
   */
  static findAll() {
    console.log(itemsData);
    return itemsData;
  }

  /**
   * Find all Items that belongs to one fridge
   * @param {string} fridgeID - target fridge Id
   * @return {Items[]} an array of all of the items in one fridge
   */
  static findByFridge(fridgeID) {
    console.log(itemsData.filter((item) => item.fridge === fridgeID))
    return itemsData.filter((item) => item.fridge === fridgeID);
  }
  /**
   * Find one Item with id
   * @param {string} id - target item Id
   * @return {Items} target item
   */
  static findById(id) {
    return itemsData.filter((item) => item.id === id)[0];
  }
  /**
   * Find all Items that belongs to a creator
   * @param {string} fridgeID - target fridge Id
   * @return {Items[]} an array of all of the items in one fridge
   */
  static findByAuthor(creatorID) {
    return itemsData.filter((item) => item.creatorID === creatorID);
  }
  /**
   * Find all Items that belongs to a categort
   * @param {string} fridgeID - target fridge Id
   * @return {Items[]} an array of all of the items in one fridge
   */
  static findByCategory(category) {
    return itemsData.filter((item) => item.category === category);
  }

  /**
   * Delete an Item from the collection by ID.
   *
   * @param {string} id - The ID of the item to delete
   * @return {Item} - The deleted item
   */
  static deleteOne(id) {
    const item = Items.findById(id);
    itemsData = itemsData.filter((s) => s.id !== id);
    return item;
  }
  /**
   * Claim an Item
   *
   * @param {string} if - The ID of the item to claim
   * @param {string} if - The userID who claim item
   * @return {Item} - The claimed item
   */
  static claim(id, quantity, userID) {
    const item = Items.findById(id);
    console.log(itemsData);
    const user = Users.findOneByID(userID)
    console.log('This is a user.')
    console.log(user['username'])
    var remaining = item.quantity - quantity
    if (remaining > 0){
      item.quantity -= quantity;
      const claimed_item = { 
        id: uuid.v4(),
        itemId: item.id, 
        quantity: parseInt(quantity), 
        status: 0,
        claimedBy: user['username'], 
        userID: userID };
      ordersData.push(claimed_item);
      console.log(claimed_item);
      item.claimerID.push(userID)
      item.claimsReceived.push(claimed_item)
      return claimed_item;
    }
    else if(remaining === 0){
      const claimed_item = { 
        id: uuid.v4(),
        itemId: item.id, 
        quantity: quantity, 
        status: 0,
        claimedBy: user['username'], 
        userID: userID  };
      item.status = 1;
      item.quantity -= quantity;
      ordersData.push(claimed_item);
      item.claimerID.push(userID)
      item.claimsReceived.push(claimed_item)
      console.log(claimed_item);
      return claimed_item;
    }
    else{
      return -1
    }
    
  }

  /**
   * confirm an Item
   *
   * @param {string} id - The ID of the item to be confrimed
   * @return {Item} - The claimed item
   */
  static confirm(id) {
    const item = Items.findById(id);
    item.status = 2;
    return item;
  }

  /**
   * finish a transcation
   *
   * @param {string} id - The ID of the item to be finished
   * @return {Item} - The finished item
   */
  static complete(orderId) {
    const order = ordersData.filter((order) => order.id === orderId)[0];
    order.status = 1;
    return order;
  }
  /**
   * cancel a transcation
   *
   * @param {string} id - The ID of the item to be cancelled
   * @return {Item} - The cancelled item
   */
  static cancel(id) {
    const item = Items.findById(id);
    item.status = 0;
    return item;
  }
  /**
   * modify an Item
   *
   * @param {string} id - The ID of the item to be modified
   * @param {string} property - The property of the item to be modified
   * @param {string} value - The new value of the property
   * @return {Item} - The modified item
   */
  static modify(id, property, value) {
    const item = Items.findById(id);
    item[property] == value;
    return item;
  }
}

module.exports = Items;
