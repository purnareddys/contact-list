let DUMMY_CONTACTS = [
  {
    name: "tester",
    DOB: "28/05/2020",
    Phone: ["9999999999"],
    email: "testing@test.com",
    id: "c1",
  },
];

const viewContacts = (req, res, next) => {
  res.status(200).json({ contacts: DUMMY_CONTACTS });
};

const addContact = (req, res, next) => {
  const { name, DOB, Phone, email } = req.body;

  const createdContact = {
    name,
    DOB,
    Phone,
    email,
    id: Phone,
  };
  DUMMY_CONTACTS.push(createdContact);

  res.status(201).json({ Contact: createdContact });
};

const updateContact = (req, res, next) => {};

const deleteContact = (req, res, next) => {};
exports.viewContacts = viewContacts;
exports.addContact = addContact;
exports.updateContact = updateContact;
exports.deleteContact = deleteContact;
