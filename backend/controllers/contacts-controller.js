//Added Dummy contact list for testing purposes
let DUMMY_CONTACTS = [
  {
    name: "tester",
    DOB: "28/05/2020",
    Phone: ["9999999999"],
    email: "testing@test.com",
    id: "c1",
  },
];

//get
const viewContacts = (req, res, next) => {
  res.status(200).json({ contacts: DUMMY_CONTACTS });
};

//post
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

//post/:cid
const updateContact = (req, res, next) => {
  const contactId = req.params.cid;
  console.log(contactId);
  const { name, DOB, Phone, email } = req.body;

  const updatedContact = {
    ...DUMMY_CONTACTS.find((c) => c.id === contactId),
  };
  console.log("Dummy", updatedContact);
  const contactIndex = DUMMY_CONTACTS.findIndex((c) => c.id === contactId);
  console.log(contactIndex);
  updatedContact.name = name;
  updatedContact.email = email;
  updatedContact.DOB = DOB;
  updatedContact.Phone = Phone;

  DUMMY_CONTACTS[contactIndex] = updatedContact;
  console.log(updatedContact);

  res.status(201).json({ message: "Successfully Updated" });
};

//delete/:cid
const deleteContact = (req, res, next) => {
  const contactId = req.params.cid;

  DUMMY_CONTACTS = DUMMY_CONTACTS.filter((c) => c.id !== contactId);
  res.status(200).json({ message: "Successfully deleted" });
};
exports.viewContacts = viewContacts;
exports.addContact = addContact;
exports.updateContact = updateContact;
exports.deleteContact = deleteContact;
