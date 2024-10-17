const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const comicRoutes = require('./routes/comicRoutes');


const mongo_url = 'mongodb+srv://lakshyasingh11july2001:JAzkiwfRwXwXAfmu@cluster0.vz9pn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

main()
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true });
}

app.use(cors());
app.use(bodyParser.json());

app.use('/root', comicRoutes);

app.listen(8080, () => {
    console.log("Server running on port 8080")
});
