let fridgesData = [];

// Need ability to generate random IDs (primary/foreign keys)
const uuid = require("uuid");

/**
 * @typedef Fridges
 *
 * @prop {Array} items - list of items in fridge
 * @prop {string} creatorID -  user ID of fridge author
 * @prop {string} fridgeID - fridgeID
 * @prop {string} name - fridge name
 * @prop {Array} members - list of users we are members of the fridge
 */

class Fridges {
  /**
   * Add a freet to the collection.
   *
   * @prop {Array[Item]} items - list of items in fridge
   * @prop {string} creatorUsername - user ID of fridge author
   * @prop {string} fridgeID - fridgeID
   * @prop {string} name - fridge name
   * @prop {Array} members - list of users we are members of the fridge
   * @return {Fridge} - the newly created freet
   */
  static addOne(name, creator) {
    const fridgeID = uuid.v4();
    const items = [];
    const members = [];
    const numMembers = members.length;
    const fridge = {
      fridgeID,
      creator,
      items,
      members,
      name,
      numMembers,
    };
    fridgesData.push(fridge);
    console.log(fridgesData)
    return fridge;
  }

  static deleteOne(id) {
    fridgesData = fridgesData.filter((fridge) => !(fridge.fridgeID == id));
    return fridgesData;
  }

  static deleteAuthorAll(creatorID) {
    fridgesData = fridgesData.filter(
      (fridge) => !(fridge.CreatorID === creatorID)
    );
    return fridgesData;
  }

  static findAll() {
    return fridgesData;
  }

  static findById(id) {
    return fridgesData.filter((fridge) => fridge.fridgeID === id)[0];
  }

  static findAuthorAll(creatorID) {
    console.log(creatorID)
    console.log(fridgesData)
    console.log(fridgesData.filter((fridge) => fridge.creatorID === creatorID))
    return fridgesData.filter((fridge) => fridge.creatorID === creatorID);
  }

  static addItem(itemID, fridgeID) {
    const fridge = Fridges.findById(fridgeID);
    fridge.items.push(itemID);
    console.log(fridge)
    return fridge;
  }

  static addMember(fridgeID, username) {
    const fridge = Fridges.findById(fridgeID);
    fridge.members.push(username);
    return fridge;
  }

  static findMemberInFridge(fridgeID, username) {
    const fridge = Fridges.findById(fridgeID);
    return fridge.members.filter((member) => member === username);
  }

  static deleteMember(fridgeID, username) {
    const fridge = Fridges.findById(fridgeID);
    console.log(username);
    fridge.members = fridge.members.filter((member) => member !== username);
    console.log(fridge);
    return fridge;
  }

}

module.exports = Fridges;
