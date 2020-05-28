const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

//Contacts Controller section
const contactsController = require("../controllers/contacts-controllers");

//Performing get,post,patch,delete methods
router.get("/user/:uid", contactsController.viewContactsByUser);
router.post(
  "/",
  [check("name").not().isEmpty(), check("Phone").not().isEmpty()],
  contactsController.addContact
);
router.patch("/:cid", contactsController.updateContact);
router.delete("/:cid", contactsController.deleteContact);

//exporting the router
module.exports = router;
