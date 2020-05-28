const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
//importing contact model
const Contact = require("../models/contact");
const User = require("../models/user");

//Added Dummy contact list for testing purposes
// let DUMMY_CONTACTS = [
//   {
//     name: "tester",
//     DOB: "28/05/2020",
//     Phone: "9999999999",
//     email: "testing@test.com",
//     id: "c1",
//     creator: "u1",
//   },
// ];

//get
//get contacts by userId
const viewContactsByUser = async (req, res, next) => {
  const userId = req.params.uid;
  let contacts;
  console.log(userId);
  try {
    contacts = await Contact.find({ creator: userId }).sort({
      Phone: 1,
    });
  } catch (err) {
    const error = new HttpError(
      "Fetching Contacts failed , Please try again",
      500
    );
    return next(error);
  }
  console.log(contacts);
  if (!contacts || contacts.length === 0) {
    return next(
      new HttpError("Could not find contacts for the provided user Id", 404)
    );
  }

  res.json({
    contacts: contacts.map((contact) => contact.toObject({ getters: true })),
  });
  // => { contact } => { contact: contact }
};

//post
//for adding the contacts to the database
const addContact = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpError("Invalid inputs passed, please check your data.", 422));
  }
  const { name, DOB, Phone, email, creator } = req.body;

  const createdContact = new Contact({
    name,
    DOB,
    Phone,
    email,
    creator,
  });
  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError(
      "Creating Contact failed, please try again",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  //saving to mongodB
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdContact.save({ session: sess });
    user.contacts.push(createdContact);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ Contact: createdContact });
};

//patch/:cid
//for updating the contact by contact id
const updateContact = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const contactId = req.params.cid;
  console.log(contactId);
  const { Phone, email } = req.body;
  console.log(Phone, email);
  let contact;
  try {
    contact = await Contact.findById(contactId);
    console.log(contact);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update Contact.",
      500
    );
    return next(error);
  }

  contact.Phone = Phone;
  contact.email = email;

  try {
    await contact.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ contact: contact.toObject({ getters: true }) });

  // const contactIndex = DUMMY_CONTACTS.findIndex((c) => c.id === contactId);

  // console.log("first", updatedContact);
  // updatedContact.email = email;
  // updatedContact.Phone = Phone;
  // console.log("second", updatedContact);

  // let newEmailArray = [];
  // let newPhoneArray = [];
  // newEmailArray.push(updatedContact.email);
  // newEmailArray.push(DUMMY_CONTACTS[contactIndex].email);
  // DUMMY_CONTACTS[contactIndex].email = newEmailArray;
  // newPhoneArray.push(updatedContact.Phone);
  // newPhoneArray.push(DUMMY_CONTACTS[contactIndex].Phone);
  // DUMMY_CONTACTS[contactIndex].Phone = newPhoneArray;
  // res.status(201).json({ message: "Successfully Updated" });
};

//delete/:cid
//for deleting the contact by contact id
const deleteContact = async (req, res, next) => {
  const contactId = req.params.cid;
  console.log(contactId);
  let contact;
  try {
    contact = await Contact.findById(contactId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete Contact.",
      500
    );
    return next(error);
  }
  if (!contact) {
    const error = new HttpError("Could not find Contact for this id.", 404);
    return next(error);
  }

  try {
    console.log("1", contact);
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await contact.remove({ session: sess });
    console.log("2", contact);
    contact.creator.contacts.pull(contact);
    console.log("3", contact);
    await contact.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete contact.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted Contact." });
};
exports.viewContactsByUser = viewContactsByUser;
exports.addContact = addContact;
exports.updateContact = updateContact;
exports.deleteContact = deleteContact;
