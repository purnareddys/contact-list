const express = require("express");

const router = express.Router();

//Contacts Controller section
const contactsController = require("../controllers/contacts-controller");

//Performing get,post,patch,delete methods
router.get("/", contactsController.viewContacts);
router.post("/", contactsController.addContact);
router.patch("/:cid", contactsController.updateContact);
router.delete("/:cid", contactsController.deleteContact);

//exporting the router
module.exports = router;
