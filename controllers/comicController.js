const Comic = require('../models/comicModel');


const getComics = async (req, res) => {
    try {
        const { page , limit , sortBy, order='asc', author, condition } = req.query;
        const filter = {};
        if (author) 
            filter.author = author;
        if (condition) 
            filter.condition = condition;

        const sortOrder = order === 'desc' ? -1 : 1;

        const comics = await Comic.find(filter)
            .sort({ [sortBy]: sortOrder })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        res.status(200).json(comics);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//---------------------------------------------------------------

const getComicById = async (req, res) => {
    try {
        const id = req.params.id;
        const comic = await Comic.findById(id);
        if (!comic)
            return res.status(404).send("Comic not found");
        res.status(200).json(comic);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//---------------------------------------------------------------

const createComic = async (req, res) => {
    try {
        const newComic = await Comic.create(req.body);
        res.status(201).json(newComic);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

//--------------------------------------------------------------

const updateComic = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedComic = await Comic.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedComic)
            return res.status(404).send("Comic not found");
        res.status(200).json(updatedComic);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

//---------------------------------------------------------------

const deleteComic = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedComic = await Comic.findByIdAndDelete(id);
        if (!deletedComic)
            return res.status(404).json("Comic not found");
        res.status(200).json("Successfully deleted the comic");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { getComics, getComicById, createComic, updateComic, deleteComic };
