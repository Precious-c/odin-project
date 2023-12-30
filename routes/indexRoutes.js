var express = require('express');
var router = express.Router();
const indexController = require("../controllers/indexController")
// const multer = require("multer")
const multer = require("../middleware/multer")

/* GET home page. */
router.get('/', indexController.getIndex);
router.get('/new-category', indexController.getNewCategory)
router.post('/add-category', indexController.addCategory)
router.delete('/remove-category', indexController.removeCategory)

router.get("/item/:id", indexController.getOneItem)
// router.delete("/item/:id", indexController.getOneItem)
router.get("/add-item", indexController.getItems)
router.post("/add-item", multer, indexController.addItem)
router.delete('/remove-item/:id', indexController.removeItem)
router.put("/remove-one/:id", indexController.removeOne)
router.put("/add-one/:id", indexController.addOne)
router.post("/search", indexController.search)

module.exports = router;


