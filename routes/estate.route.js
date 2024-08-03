const express = require("express");
const {getAll, getById, add, deletee, update, filter} = require('./../controllers/estate.controller.js')

const router = express.Router();



router.get('/',getAll);
router.post('/',add);
router.get('/properties',filter);

router.put('/:id',update);
router.delete('/:id',deletee);
router.get('/:id',getById);

module.exports = router;