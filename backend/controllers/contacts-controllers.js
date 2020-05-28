const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");

//importing contact model
const Contact = require("../models/contact");

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
  try {
    contacts = await Contact.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Fetching Contacts failed , Please try again",
      500
    );
    return next(error);
  }
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

  //saving to mongodB
  try {
    await createdContact.save();
  } catch (err) {
    const error = new HttpError(
      "Error in creating a Contact, Please try again",
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
    contact = await Contact.findById(contactId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete Contact.",
      500
    );
    return next(error);
  }

  try {
    await contact.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete Contact.",
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
