const express = require('express')
const {getAllUsers, register, login, getById, getCustomers} = require('./../controllers/user.controller.js')



const router = express.Router();

router.get("/",getAllUsers);
router.get("/customers",getCustomers);

router.get("/:id",getById);
router.post("/register",register);
router.post("/login",login);

module.exports = router;