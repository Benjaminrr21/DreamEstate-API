const express = require('express')
const {getByUser, addToFavoriteList, deleteFromList} = require('./../controllers/favoritelist.controller.js')

const router = express.Router()

router.post("/",addToFavoriteList)
router.get("/:uid",getByUser)
router.delete("/:id",deleteFromList)

module.exports = router