const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");

//Added Dummy contact list for testing purposes
const Contact = require("../models/contact");

let DUMMY_CONTACTS = [
  {
    name: "tester",
    DOB: "28/05/2020",
    Phone: "9999999999",
    email: "testing@test.com",
    id: "c1",
    creator: "u1",
  },
];

//get
const viewContacts = (req, res, next) => {
  res.status(200).json({ contacts: DUMMY_CONTACTS });
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
  // DUMMY_CONTACTS.push(createdContact);
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

//post/:cid
const updateContact = (req, res, next) => {
  const contactId = req.params.cid;
  const { Phone, email } = req.body;
  if (!DUMMY_CONTACTS.find((c) => c.id === contactId)) {
    throw new HttpError("Could not find the Specific Contact");
  }
  const updatedContact = {
    ...DUMMY_CONTACTS.find((c) => c.id === contactId),
  };

  const contactIndex = DUMMY_CONTACTS.findIndex((c) => c.id === contactId);

  console.log("first", updatedContact);
  updatedContact.email = email;
  updatedContact.Phone = Phone;
  console.log("second", updatedContact);

  let newEmailArray = [];
  let newPhoneArray = [];
  newEmailArray.push(updatedContact.email);
  newEmailArray.push(DUMMY_CONTACTS[contactIndex].email);
  DUMMY_CONTACTS[contactIndex].email = newEmailArray;
  newPhoneArray.push(updatedContact.Phone);
  newPhoneArray.push(DUMMY_CONTACTS[contactIndex].Phone);
  DUMMY_CONTACTS[contactIndex].Phone = newPhoneArray;
  res.status(201).json({ message: "Successfully Updated" });
};

//delete/:cid
const deleteContact = (req, res, next) => {
  const contactId = req.params.cid;

  if (!DUMMY_CONTACTS.find((c) => c.id === contactId)) {
    throw new HttpError("Could not find the Specific Contact");
  }
  DUMMY_CONTACTS = DUMMY_CONTACTS.filter((c) => c.id !== contactId);
  res.status(200).json({ message: "Successfully deleted" });
};
exports.viewContacts = viewContacts;
exports.addContact = addContact;
exports.updateContact = updateContact;
exports.deleteContact = deleteContact;
