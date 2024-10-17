const express = require("express");
const { createComic, getComics, getComicById, updateComic, deleteComic } = require('../controllers/comicController');

const router = express.Router();

router.post('/comics', createComic);
router.get('/comics', getComics);
router.get('/comics/:id', getComicById);
router.put('/comics/:id', updateComic);
router.delete('/comics/:id', deleteComic);

module.exports = router;
