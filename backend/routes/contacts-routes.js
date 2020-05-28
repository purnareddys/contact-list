const express = require("express");

const router = express.Router();

const contactsController = require("../controllers/contacts-controller");

router.get("/", contactsController.viewContacts);
router.post("/", contactsController.addContact);
router.patch("/:cid", contactsController.updateContact);
router.delete("/:cid", contactsController.deleteContact);

module.exports = router;
