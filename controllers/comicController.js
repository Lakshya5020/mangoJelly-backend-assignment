const Comic = require('../models/comicModel');


const createComic = async (req, res) => {
    try {
        const newComic = await Comic.create(req.body);
        res.status(201).json(newComic);
    } catch (error) {
        res.status(400).send("Some error has occured");
    }
};

//--------------------------------------------------------------

const getComics = async (req, res) => {
    try {
        const { page = 1, limit = 5, sortBy = 'year', author, condition } = req.query;
        const filter = {};
        if (author) filter.author = author;
        if (condition) filter.condition = condition;

        const comics = await Comic.find(filter)
            .sort({ [sortBy]: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        res.status(200).json(comics);
    } catch (error) {
        res.status(500).send("Error in loading data");
    }
};

//---------------------------------------------------------------

const getComicById = async (req, res) => {
    try {
        const id=req.params.id;
        const comic = await Comic.findById(id);
        if (!comic) 
            return res.status(404).send("Comic not found");
        res.status(200).json(comic);
    } catch (error) {
        res.status(500).send("Some error has occured");
    }
};

//---------------------------------------------------------------

const updateComic = async (req, res) => {
    try {
        const id=req.params.id;
        const updatedComic = await Comic.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedComic)
            return res.status(404).send("Comic not found");
        res.status(200).json(updatedComic);
    } catch (error) {
        res.status(400).send("Error in updating comic");
    }
};

//---------------------------------------------------------------

const deleteComic = async (req, res) => {
    try {
        const id=req.params.id;
        const deletedComic = await Comic.findByIdAndDelete(id);
        if (!deletedComic) 
            return res.status(404).json("Comic not found");
        res.status(200).json("Successfully deleted the comic");
    } catch (error) {
        res.status(500).send("Error in deleting comic");
    }
};

module.exports = { createComic, getComics, getComicById, updateComic, deleteComic };
